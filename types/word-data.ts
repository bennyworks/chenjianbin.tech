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
    derived_words: {
      word: string
      translation: string
    }[]
  }
  affix_analysis: {
    prefix: string
    root: string
    suffix: string
    similar_words: {
      word: string
      translation: string
    }[]
  }
  word_forms: {
    noun: {
      word: string
      translation: string
    }
    plural: {
      word: string
      translation: string
    }
    adjective: {
      word: string
      translation: string
    }
    adverb: {
      word: string
      translation: string
    }
    phrases: {
      phrase: string
      translation: string
    }[]
  }
}
