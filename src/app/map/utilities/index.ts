import { Types } from '../../../interactive-maps'

// TODO: We can use the Locale.getLanguageCode instead of using this.
const getLanguageCode = (language: string) => language.split('-')[0]

const groupAreaLabelsByLanguages = (
  areas: Types.StoreAreas,
  languages: string[]
) => {
  return Object.values(areas).reduce(
    (languageCollection, area) => {
      languages
        .map(lang => getLanguageCode(lang))
        .map(langCode => [langCode, area.labels[langCode]])
        .forEach(([langCode, label]) => {
          if (label) {
            const collection = languageCollection[langCode]
            if (collection) {
              collection[area.id] = label.trim()
            } else {
              languageCollection[langCode] = {
                [area.id]: label.trim(),
              }
            }
          }
        })
      return languageCollection
    },
    {} as Record<string, Record<string, string>>
  )
}

/**
 * This will merge all translation based on their languages. `target` will have
 * higher precedence. Whatever languages given by the `target`, that the languages will be created/followed.
 * This is useful if we gonna override the default translations of the maps package and pass it to
 * Maps along the areas.
 */
const mergeTranslations = (
  target: Record<string, any>,
  source: Record<string, any>
) => {
  return Object.entries(target)
    .map(([lang, value]) => [
      lang,
      {
        ...source[lang],
        ...value,
      },
    ])
    .reduce(
      (acc, [lang, value]) => ({
        ...acc,
        [lang]: value,
      }),
      {}
    )
}

export { groupAreaLabelsByLanguages, mergeTranslations }
