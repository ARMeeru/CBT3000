export interface Translation {
  corporate?: string;
  honest?: string;
}

export interface TranslationHistory {
  id: string;
  input: string;
  output: string;
  direction: 'corporate-to-honest' | 'honest-to-corporate';
  timestamp: number;
}

export interface BuzzwordBingoCard {
  id: string;
  words: string[];
  checkedWords: boolean[];
  createdAt: number;
}

export interface TranslationSuggestion {
  text: string;
  confidence: number;
  isExact: boolean;
}

export interface TranslationResult {
  output: string;
  confidence: number;
  suggestions: TranslationSuggestion[];
  isEasterEgg: boolean;
}

export type TranslationDirection = 'corporate-to-honest' | 'honest-to-corporate';
