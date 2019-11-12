import React from 'react'
import langData from './lang'
import randomItem from 'random-item'
import LocaleCode from 'locale-code'

/* const LocaleCode = require('locale-code') */
const interpolate = require('interpolate-object')

const interpolatedResult = (value: string, data?: Record<string, any>) => {
  if (!value) {
    return ''
  }
  // check if the value is options. For e.g, "Then turn|Turning to"
  // Then we need to random get item.
  if (valueIsOptions(value)) {
    const options = value.split('|')
    return interpolate(randomItem(options), data)
  }
  return interpolate(value, data)
}

interface Translations<T = {}> {
  switchLanguage: (lang: keyof T) => void
  getResource: (lang?: string) => Record<string, any>
  subscribe: (listener: () => void) => () => void
  currentLanguage: string
}

export interface Translate {
  (
    key: string,
    options?: {
      data?: Record<string, string>
      defaultLang?: string
    }
  ): string
}

const DEFAULT_LANGUAGE = 'en' // en-GB => English-Great Britain

const getDefaultLanguage = () => DEFAULT_LANGUAGE

const createTranslations: <T extends Record<string, any>>(
  resources: T,
  lang: string
) => Translations<T> = (resources, lang) => {
  const givenLang = lang
  const listeners = new Map()

  const subscribe = (listener: () => void) => {
    // Only add the listener if its not yet exist. Why are we adding `listener`
    // as a `key` to the `Map`? Because when `subscribe` gets invoke and same `subscribe`
    // function is used by 2 subscription, we only need to push the `subscribe` once in `Map` (for perf optimization).
    // Using `Map` where the key is a `function`, we can achieve this.
    if (!listeners.has(listener)) {
      listeners.set(listener, listener)
    }
    const unsubscribe = () => {
      // Only remove the listener if it is exist.
      if (listeners.has(listener)) {
        listeners.delete(listener)
      }
    }
    return unsubscribe
  }

  let currentResource = resources[givenLang] || resources[getDefaultLanguage()]

  const switchLanguage = (currentLang: keyof (typeof resources)) => {
    const foundResource = resources[currentLang]
    if (!foundResource || foundResource === currentResource) {
      return
    }
    currentResource = foundResource
    /**
     * This is used for subscribing to translations in Component layer.
     * If the language was changed, invoke the subscribers. This is good for
     * re-rendreing the Component which is using translation value.
     */
    listeners.forEach(listener => listener())
  }

  return {
    switchLanguage,
    getResource: (lang: string = givenLang) => {
      const resource = resources[lang]
      if (resource) {
        return resource
      }
      return resources[getDefaultLanguage()]
    },
    subscribe,
    currentLanguage: givenLang,
  }
}

// FIXME: This Component names are very confusing. They are the same
// but the value are not.
const TranslationsContext = React.createContext<Translations | undefined>(
  undefined
)

const TranslationsProvider: React.FC<{
  value: { data: Record<string, any>; lang: string }
}> = ({ value, children }) => {
  const t = React.useMemo(
    () =>
      createTranslations(value.data, LocaleCode.getLanguageCode(value.lang)),
    [value]
  )
  return (
    <TranslationsContext.Provider value={t}>
      {children}
    </TranslationsContext.Provider>
  )
}

const useTranslations = () => {
  const t = React.useContext(TranslationsContext)
  if (!t) {
    throw new Error('Consuming TranslationsContext outside its Provider.')
  }
  return t
}

/**
 * TODO: I think we don't need this because the Component subscribing to
 * `useTranslations` hook will re-render if the value passed to `TranslationContext`
 * was changed. So if we chang the `language`, resource will change which triggers
 * re-render to subscriber Components. Thus, we don't need to have this special
 * hook. And also the size of Components which only use for swithing language is small.
 * Thus, its ok to re-render them.
 */
const useTranslationResource = () => {
  const t = useTranslations()
  const resource = React.useRef(t.getResource())
  const [, forceUpdate] = React.useState({})

  React.useEffect(() => {
    const unsubscribe = t.subscribe(() => {
      forceUpdate({})
      resource.current = t.getResource()
    })
    return () => unsubscribe()
  }, [t])

  return resource.current
}

const valueIsOptions = (value: string) => value.includes('|')

const useTranslate = () => {
  const t = useTranslations()
  const cb: Translate = (key, options?) => {
    const currentResource = t.getResource()

    const keys = key.split('.')

    const { data: newData, defaultLang } = options || {
      data: {},
      defaultLang: '',
    }

    // TODO: We need to handle the `translate` without default value.

    if (defaultLang !== '') {
      let translationValue: string
      // If the speech which we want to access it deep. Like `directions.left`.
      if (keys.length > 0) {
        const recursiveGetValue = (value: any, idx: number): any => {
          const currentIdx = idx + 1
          if (!keys[currentIdx]) {
            return value
          }
          if (value) {
            return recursiveGetValue(value[keys[currentIdx]], currentIdx)
          }
        }

        const value = recursiveGetValue(currentResource[keys[0]], 0)
        translationValue = interpolatedResult(value, newData)
      } else {
        const value = currentResource[key]
        translationValue = interpolatedResult(value, data)
      }

      if (translationValue !== '') {
        return translationValue
      }

      // Fallback to `defaultLang` if value is empty string
      // use the resource based on default language.
      const defaultResource = t.getResource(defaultLang)
      if (keys.length > 0) {
        const recursiveGetValue = (value: any, idx: number): any => {
          const currentIdx = idx + 1
          if (!keys[currentIdx]) {
            return value
          }
          return recursiveGetValue(value[keys[currentIdx]], currentIdx)
        }

        const value = recursiveGetValue(defaultResource[keys[0]], 0)
        translationValue = interpolatedResult(value, newData)
      } else {
        const value = defaultResource[key]
        translationValue = interpolatedResult(value, data)
      }

      return translationValue
    }

    return ''
  }
  return React.useCallback(cb, [t])
}

const data = langData

export {
  TranslationsProvider,
  useTranslationResource,
  useTranslate,
  useTranslations,
  data,
  getDefaultLanguage,
}
