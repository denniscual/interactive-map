import noop from 'lodash.noop'
import kebabCase from 'lodash.kebabcase'
import { curry } from 'ramda'
import xmlbuilder from 'xmlbuilder'
import AWS from 'aws-sdk'
import stringHash from 'string-hash'
import { get, set, Store } from 'idb-keyval'
import config from './config'

// TODO: Add typescript support

const providers = {
  BING: 'BING',
  POLLY: 'POLLY',
}

const validateOptions = (options = {}) => {
  if (typeof options === 'undefined') {
    throw new Error('Options must be provided to SpeechSynthesis constructor')
  }

  return Object.assign(
    {
      provider: providers.POLLY,
      providerOptions: {
        language: 'en-US',
        subscriptionKey: config.AZURE.speechSubscriptionKey,
      },
    },
    options
  )
}

const bingSynthesize = ({ ssml = '', token = '' }) =>
  fetch(
    `https://${
      config.AZURE.region
    }.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        Authorization: `Bearer ${token}`,
      },
      body: ssml,
    }
  )

const pollySynthesize = (
  polly,
  {
    OutputFormat = 'mp3',
    Text = '<speak></speak>',
    TextType = 'ssml',
    VoiceId = 'Joanna',
  }
) =>
  new Promise((resolve, reject) => {
    polly.synthesizeSpeech(
      {
        OutputFormat,
        Text,
        TextType,
        VoiceId,
      },
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          const uInt8Array = new Uint8Array(data.AudioStream)
          const arrayBuffer = uInt8Array.buffer
          const blob = new Blob([arrayBuffer])
          resolve(blob)
        }
      }
    )
  })

const getBingToken = subscriptionKey =>
  fetch(
    `https://${
      config.AZURE.region
    }.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Content-Length': '0',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    }
  )
    .then(res => res.text())
    .then(token => ({ token, timestamp: Date.now() }))

const getProp = curry((path, object) => {
  const value = object[path]
  if (value) {
    return value
  }
  return undefined
})

class SpeechSynthesis {
  // Maybe type -> can accept null, undefined, and the ideal type.
  options = {}

  bingToken = {
    token: null,
    timestamp: 0,
  }

  audioElement = {}

  polly = {}

  store = {}

  cancel = noop

  getVoices = noop

  pause = noop

  resume = noop

  constructor(options) {
    this.options = validateOptions(options)
    // // create audio
    // this.audioElement = document.createElement('audio')
    // this.audioElement.setAttribute(
    //   'id',
    //   `audioElement${new Date().valueOf().toString()}`
    // )

    // // Check if there is document.body.
    // if (document.body) {
    //   // Then append the element.
    //   document.body.appendChild(this.audioElement)
    // }

    const getProvider = getProp('provider')
    if (
      getProvider(this.options) === providers.BING &&
      this.options.providerOptions.subscriptionKey
    ) {
      this.getBingToken()
    }

    if (getProvider(this.options) === providers.POLLY) {
      AWS.config.update({
        region: config.AWS.region,
        credentials: new AWS.Credentials(
          config.AWS.credentials.accessKeyId,
          config.AWS.credentials.secretAccessKey
        ),
      })

      this.polly = new AWS.Polly()
    }

    this.store = new Store(
      `speech-synthesis-${kebabCase(this.options.provider)}`
    )
  }

  getBingToken = () => {
    if (Date.now() - this.bingToken.timestamp > 5400) {
      return getBingToken(this.options.providerOptions.subscriptionKey).then(
        bingToken => {
          this.bingToken = bingToken
          return bingToken.token
        }
      )
    }

    return Promise.resolve(this.bingToken.token)
  }

  /**
   * The blob is the resolved value of a Promise.
   */
  createBlobByText = text => {
    const key = stringHash(text)
    return get(key, this.store).then(val => {
      if (val) {
        return val
      }
      if (this.options.provider === providers.BING) {
        const ssml = xmlbuilder
          .create('speak')
          .att('version', '1.0')
          .att('xml:lang', this.options.providerOptions.language)
          .ele('voice')
          .att('xml:lang', this.options.providerOptions.language)
          .att(
            'name',
            'Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)'
          )
          .txt(text)
          .end()

        return this.getBingToken()
          .then(token =>
            bingSynthesize({
              ssml,
              token,
            })
          )
          .then(res => res.blob())
          .then(blob => {
            set(key, blob, this.store)
            return blob
          })
      }

      if (this.options.provider === providers.POLLY) {
        return pollySynthesize(this.polly, {
          Text: `<speak>${text}</speak>`,
        }).then(blob => {
          set(key, blob, this.store)
          return blob
        })
      }

      return Promise.reject('Speech Sythesizer unknown speech provider')
    })
  }

  // playAudio = blob =>
  //   new Promise((resolve, reject) => {
  //     const url = URL.createObjectURL(blob)
  //     // update the src file of the audio.
  //     this.audioElement.src = url
  //     this.audioElement.pause()
  //     this.audioElement.load()
  //     this.audioElement.play()
  //     this.audioElement.addEventListener('ended', () => {
  //       resolve()
  //     })
  //   })

  // speak = text => this.createBlobByText(text).then(this.playAudio)

  speak = text => this.createBlobByText(text).then(console.log)

  createMediaSrc = text =>
    this.createBlobByText(text).then(blob => {
      if (text === '') {
        return ''
      }
      return URL.createObjectURL(blob)
    })

  getAudioElement = () => this.audioElement
}

export { SpeechSynthesis, providers }
