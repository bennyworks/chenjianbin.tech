export interface WordData {
  word: string
  pronunciation: {
    uk: string
    us: string
  }
  meaning: string
  analysis: string
  examples: {
    context: string
    sentence: string
    translation: string
  }[]
  root_analysis: {
    root: string
    derived_words: string[]
  }
  affix_analysis: {
    prefix: string
    root: string
    suffix: string
    similar_words: string[]
  }
  word_forms: {
    noun: string
    plural: string
    adjective: string
    phrases: string[]
  }
}
