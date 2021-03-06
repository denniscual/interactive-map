import React from 'react'
import { isNil } from 'ramda'
import { Observable } from 'rxjs'
import { noop } from '../__utils__'
import * as nav from '../navigation'
import * as types from '../types'
import { useTranslations, getDefaultLanguage } from '../translations'

const { SpeechSynthesis } = require('./speech-synthesizer')

interface Speech {
  index?: number
  text: string
}
type AudioDelay = number | (() => number)

function* speechCollectionGenerator(speechCollection: ReadonlyArray<string>) {
  let index = 0
  for (let text of speechCollection) {
    yield { text, index }
    index++
  }
}

const arrayIsNotEmpty: <T>(arr: ReadonlyArray<T>) => boolean = arr =>
  arr.length > 0

const speechSythesizer = new SpeechSynthesis()

const DELAY_TIME = 2000
const enhanceAudioDelay = (delay: AudioDelay, speech: Speech) => {
  if (typeof delay === 'function') {
    // Use the DELAY_TIME if the speech is the first speech because we don't want to wait 4.5secs in creating
    // the first speech.
    if (speech.index === 0) {
      return DELAY_TIME
    } else {
      const distance = delay()
      // If distance is greater than 1100 then we gonna add the delay time. Let say from 3000 into 4500. Else,
      // use the default
      if (distance >= 1100) {
        return 4500
      }
      return DELAY_TIME
    }
  }
  return delay
}
/**
 * If the process time of the `speechSynthesizer.createMediaSrc` is greater than
 * the audio delay, then we gonna cancel the audio. Else, proceed the creation of media src.
 */
const useCreateMediaSrcWithAudioCancellation = (
  delay: AudioDelay = DELAY_TIME
) => {
  return React.useCallback(
    (speech: Speech) => {
      const _delay = enhanceAudioDelay(delay, speech)
      return new Observable<string>(subscriber => {
        // If the delay is a function, it will return the wayfinder distance. We gonna compute a
        // delay time based on the given distance. Why? so that we can utilize the time of generating the media src if the distance is longer.
        const timeout = setTimeout(() => {
          subscriber.error({
            type: 'AUDIO_TIMEOUT',
            message: 'Timeout reached.',
          })
        }, _delay)
        // Fire up the speech server
        speechSythesizer
          .createMediaSrc(speech.text)
          .then((src: string) => {
            clearTimeout(timeout)
            subscriber.next(src)
          })
          .catch((err: Error) => {
            subscriber.error({ type: 'GENERATING_AUDIO', message: err.message })
          })
      })
    },
    [delay]
  )
}

// NOTE: This component is hardly coupled to wayfinder. Because of this, we need some work
// to do if we want to re-use this into different feature. We want that `TextToSpeech` is
// not coupled to any feature.
const TextToSpeech: React.FC<{
  text?: string
  collection?: ReadonlyArray<string>
  onFirstAudioEnded?: types.Noop
  onAudioCollectionEnded?: types.Noop
  onPlay?: (phrase: string) => {}
  onEnded?: types.Noop
  options?: types.VoiceAssistantModifier
  // Audio cancellation
  // When the speech server takes too long to generate the audio based in audioText, we gonna call
  // this event handler.
  audioDelay?: AudioDelay
  onAudioTimeout?: () => void
}> = React.memo(
  ({
    text = '',
    collection = [],
    onFirstAudioEnded = noop,
    onAudioCollectionEnded = noop,
    onPlay = noop,
    onEnded = noop,
    audioDelay,
    onAudioTimeout = noop,
    options,
  }) => {
    const audioEl = React.useRef<HTMLAudioElement | null>(null)
    const [speech, setSpeech] = React.useState<Speech>({ text: '' })
    const speechGenerator = React.useRef<IterableIterator<
      Speech | undefined
    > | null>(null)
    const t = useTranslations()
    const { currentLanguage } = t
    const [src, setSrc] = React.useState('')
    const audioTimeoutRef = React.useRef(0)

    const textToSpeechReset = React.useCallback(() => {
      speechGenerator.current = null
      setSpeech({ text: '' })
      // pause the audio
      if (options && options.audioElement) {
        /* options.audioElement.pause() */
      }
    }, [])

    const navigationObservable = nav.useNavigationObservable()
    React.useEffect(
      function subscribeToNewNavigation() {
        const subscriber = navigationObservable.subscribe(({ type }) => {
          if (type === 'new') {
            // Reset the data use for speech so that we can prevent the unnecessary generating of audio.
            textToSpeechReset()
          }
          return () => subscriber.unsubscribe()
        })
      },
      [textToSpeechReset, navigationObservable]
    )

    React.useEffect(
      function settingSpeechAndSpeechGenerator() {
        if (!arrayIsNotEmpty(collection)) {
          textToSpeechReset()
        }
        // Initialising speech collection and speech generator if the collection is not empty.
        if (arrayIsNotEmpty(collection)) {
          speechGenerator.current = speechCollectionGenerator(collection)
          const speech = speechGenerator.current.next().value
          // Init creation of audio based on the speech.
          if (speech) {
            setSpeech(speech)
          }
        }
        // This block of codes will only run if the `TextToSpeech` is using `text` not `collection`.
        else if (
          isNil(speechGenerator.current) &&
          !arrayIsNotEmpty(collection) &&
          text !== ''
        ) {
          setSpeech({ text })
        }
      },
      [collection, text, textToSpeechReset]
    )

    const createMediaSrcWithAudioCancellation = useCreateMediaSrcWithAudioCancellation(
      audioDelay
    )
    React.useEffect(
      function triggerOnSpeak() {
        if (speech.text !== '') {
          // If the speech synthesizer is handled by the template app
          if (options && options.onSpeak) {
            // NOTE: We need to pass a message object. The type of the object is the same
            // message type which our store-assistant uses. E.g
            // { en: 'hello worlds', }
            options.onSpeak({
              [currentLanguage]: speech.text,
              // `currentLanguage` is referencing to current language used by the app.
              // but because our `translate` function can create a text from default resource if no translation for the given tranlsation , English resource,
              // then `speech.text` could be possible English text even though the `currentLanguage` is spanish.
              // Because of this, we need a fallback and that the `defaultLangauge` property is.
              [getDefaultLanguage()]: speech.text,
            })

            /**
             * Using `window` is just workaround to properly set the type of the `setTimeout` returned value.
             * This is an audio cancellation scheduling. We gonna schedule to reset the speech if the response
             * doens't come withing 3 seconds. This will be destroyed if the response is executed on
             * `audio.onEnded` before 3000.
             */
            /* audioTimeoutRef.current = window.setTimeout(() => { */
            /*   textToSpeechReset(); */
            /* }, 3000); */
          } else {
            const _audioEl = audioEl.current
            const subscriber = createMediaSrcWithAudioCancellation(
              speech
            ).subscribe({
              next(src) {
                setSrc(src)
              },
              error(error) {
                const { type } = error
                if (type === 'AUDIO_TIMEOUT') {
                  // reset
                  textToSpeechReset()
                  onAudioTimeout()
                }
              },
            })
            return function effectCleanup() {
              if (_audioEl) {
                _audioEl.pause()
              }
              subscriber.unsubscribe()
            }
          }
        }
      },
      [
        speech,
        createMediaSrcWithAudioCancellation,
        onAudioTimeout,
        textToSpeechReset,
        currentLanguage,
      ]
    )

    React.useEffect(
      function attachEventHandlers() {
        const handlePlay = () => {
          // onPlay(speech.text);
        }
        const handleEnded = () => {
          // This will destroy the audio cancellation scheduling. We need to destory if the audio response
          // is early to scheduled time.
          /* clearTimeout(audioTimeoutRef.current); */
          // This would handle the tracking of audios for speech collection
          if (!isNil(speechGenerator.current) && arrayIsNotEmpty(collection)) {
            const { value: speech, done } = speechGenerator.current.next()
            // Processing every item of the speech collection.
            if (speech) {
              // If generator is not yet done, we gonna update the audioText into
              // the next generator text
              if (!done) {
                setSpeech({ text: speech.text, index: speech.index })
              }
              // We gonna invoke the onFirstAudioEnded in here if the index is 1.
              // If the index is 1, it means that the first audio is already ended because
              // it is already processed. How can we say it is already processed? Basically
              // the speech.index will not be equal to 1 if the first audio, speech.index === 0, is not
              // yet finished.
              if (speech.index === 1) {
                onFirstAudioEnded()
              }
            }
            // If value is undefined, it means that the collection is already finished.
            else {
              // reset
              textToSpeechReset()
              onAudioCollectionEnded()
            }
          }
          onEnded()
        }

        if (options && options.audioElement) {
          const templateAudioElement = options.audioElement

          /* templateAudioElement.addEventListener('play', handlePlay) */
          /* templateAudioElement.addEventListener('ended', handleEnded) */

          return function effectCleanup() {
            /* templateAudioElement.removeEventListener('play', handlePlay) */
            /* templateAudioElement.removeEventListener('ended', handleEnded) */
          }
        } else {
          if (audioEl.current) {
            // We gonna assign the audioEl.current into variable audioElement. Why? Because
            // once the effect cleanup is invoked, we have an assurance that the
            // audioElement is pointing to previous audioEl.current object. Internally,
            // React would mutate the audioEl.current in next render. So before the mutation,
            // we already assigned the previous audioEl.current so that after the mutation and
            // the invocation of the effect cleanup in next render, the audioElement
            // which is accessible to cleanup would point to previous audioElement.current via closure
            // which basically the behaviour which we want because we want to remove
            // the listeners from previous element not the new element.
            const audioElement = audioEl.current

            audioElement.addEventListener('play', handlePlay)
            audioElement.addEventListener('ended', handleEnded)

            return function effectCleanup() {
              // audioElement in here is pointing to previous audioEl.current object.
              audioElement.removeEventListener('play', handlePlay)
              audioElement.removeEventListener('ended', handleEnded)
            }
          }
        }
      },
      /* eslint-disable react-hooks/exhaustive-deps */
      [
        collection,
        onAudioCollectionEnded,
        onFirstAudioEnded,
        onEnded,
        onPlay,
        textToSpeechReset,
        speech,
      ]
    )

    return null

    // return <audio ref={audioEl} autoPlay src={src} />;
  }
)

export default TextToSpeech
