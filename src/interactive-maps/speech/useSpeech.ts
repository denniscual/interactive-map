import React from 'react'
import { SpeechSynthesis } from './speech-synthesizer'

const speechSythesizer = new SpeechSynthesis()

interface SpeechAction {
  text: string
  delay?: number
}

const initDelay = 500

type Callback = () => Promise<any>

const delayToCall = (fn: Callback, wait: number = initDelay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
        .then(resolve)
        .catch(reject)
    }, wait)
  })

const resolvePromisesSequentially: <T>(
  arr: T[],
  cb: (value: T, idx: number) => Promise<any>
) => Promise<any> = (arr, cb) =>
  arr.reduce(
    (promise, value, idx) => promise.then(() => cb(value, idx)),
    Promise.resolve()
  )

/**
 * For text-to-speech feature
 */
const useSpeech = () => {
  /**
   * Create an API on top of createMediaURL and the behaviour is almost the same
   * of this speak API but it doesnt create a bug compare to speak.
   */

  /**
   * Speak supports both generation of single audio or multiple audios.
   */
  const speak = React.useCallback(
    (actions: SpeechAction[] | SpeechAction) => {
      if (Array.isArray(actions)) {
        // We gonna invoke the speak API here sequentially
        // not parallel. So we gonna use helper which is not Promise.all
        // because latter API is parallel.
        return resolvePromisesSequentially(actions, ({ text, delay }) => {
          return delayToCall(() => {
            return speechSythesizer.speak(text)
          }, delay)
        })
      } else {
        const { text, delay } = actions
        return delayToCall(() => {
          return speechSythesizer.speak(text)
        }, delay)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return speak
}

export default useSpeech
