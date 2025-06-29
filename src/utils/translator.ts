import { translations, easterEggs, wittyMessages } from '../data/translations';
import { TranslationDirection, TranslationResult, TranslationSuggestion } from '../types';

export class TranslationEngine {
  private static instance: TranslationEngine;
  
  static getInstance(): TranslationEngine {
    if (!TranslationEngine.instance) {
      TranslationEngine.instance = new TranslationEngine();
    }
    return TranslationEngine.instance;
  }

  translate(input: string, direction: TranslationDirection): TranslationResult {
    if (!input.trim()) {
      return {
        output: '',
        confidence: 0,
        suggestions: [],
        isEasterEgg: false
      };
    }

    // Check for easter eggs first
    const easterEggResult = this.checkEasterEggs(input, direction);
    if (easterEggResult) {
      return easterEggResult;
    }

    // Better sentence boundary detection
    const sentences = this.splitIntoSentences(input);
    let result = '';
    let translationCount = 0;
    let exactMatches = 0;
    const suggestions: TranslationSuggestion[] = [];
    
    // Process each sentence separately to maintain proper punctuation and spacing
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const translatedSentence = this.translateSentence(sentence, direction);
      result += translatedSentence.output;
      translationCount += translatedSentence.translationCount;
      exactMatches += translatedSentence.exactMatches;
      
      // Add space between sentences if not the last one and next sentence doesn't start with punctuation
      if (i < sentences.length - 1 && !sentences[i + 1].match(/^[.!?,:;]/)) {
        result += ' ';
      }
    }
    
    // Generate suggestions for the entire input
    this.generateSuggestions(input, direction, suggestions);



    // Calculate confidence based on translation quality
    const confidence = this.calculateConfidence(input, result, exactMatches, translationCount);

    return {
      output: result,
      confidence,
      suggestions: suggestions.slice(0, 5), // Limit to top 5 suggestions
      isEasterEgg: false
    };
  }

  private checkEasterEggs(input: string, direction: TranslationDirection): TranslationResult | null {
    const inputLower = input.toLowerCase().trim();
    
    for (const egg of easterEggs) {
      const source = direction === 'corporate-to-honest' ? egg.corporate : egg.honest;
      const target = direction === 'corporate-to-honest' ? egg.honest : egg.corporate;
      
      if (!source || !target) continue;
      
      if (inputLower === source.toLowerCase()) {
        return {
          output: target,
          confidence: 100,
          suggestions: [],
          isEasterEgg: true
        };
      }
    }
    
    return null;
  }

  private generateSuggestions(input: string, direction: TranslationDirection, suggestions: TranslationSuggestion[]): void {
    const inputLower = input.toLowerCase();
    const allTranslations = [...translations, ...easterEggs];
    
    for (const translation of allTranslations) {
      const source = direction === 'corporate-to-honest' ? translation.corporate : translation.honest;
      const target = direction === 'corporate-to-honest' ? translation.honest : translation.corporate;
      
      if (!source || !target) continue;
      
      const sourceLower = source.toLowerCase();
      
      // Check for partial matches
      if (sourceLower.includes(inputLower) || inputLower.includes(sourceLower)) {
        const confidence = this.calculateSimilarity(inputLower, sourceLower);
        if (confidence > 30) { // Only suggest if similarity is above threshold
          suggestions.push({
            text: source,
            confidence,
            isExact: sourceLower === inputLower
          });
        }
      }
    }
    
    // Sort suggestions by confidence
    suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 100;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return Math.round(((longer.length - distance) / longer.length) * 100);
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  private calculateConfidence(input: string, output: string, exactMatches: number, totalMatches: number): number {
    if (input === output) return 0; // No translation occurred
    if (exactMatches > 0) return Math.min(95, 70 + (exactMatches * 10)); // High confidence for exact matches
    if (totalMatches > 0) return Math.min(70, 40 + (totalMatches * 15)); // Medium confidence for fuzzy matches
    return 10; // Low confidence for no matches
  }

  getRandomWittyMessage(type: 'loading' | 'error' | 'empty'): string {
    // Always use 'errors' for error messages
    let key: keyof typeof wittyMessages = (type === 'error') ? 'errors' : type;
    const messages = wittyMessages[key];
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return 'Something went wrong with our corporate jargon!';
    }
    return messages[Math.floor(Math.random() * messages.length)];
  }

  calculateBullshitLevel(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    
    if (totalWords === 0) return 0;

    let corporateWords = 0;
    
    // Check for corporate phrases and buzzwords
    translations.forEach(translation => {
      if (translation.corporate) {
        const corporatePhrase = translation.corporate.toLowerCase();
        if (text.toLowerCase().includes(corporatePhrase)) {
          corporateWords += corporatePhrase.split(' ').length;
        }
      }
    });

    // Check for individual buzzwords
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      const corporateBuzzwords = [
        'synergy', 'leverage', 'paradigm', 'optimize', 'streamline', 'scalable',
        'robust', 'strategic', 'holistic', 'innovative', 'disruptive', 'agile',
        'dynamic', 'comprehensive', 'cutting-edge', 'next-generation', 'world-class',
        'mission-critical', 'best-in-class', 'value-driven', 'results-oriented',
        'customer-centric', 'data-driven', 'seamless', 'intuitive', 'turnkey',
        'enterprise', 'ecosystem', 'framework', 'methodology', 'infrastructure'
      ];
      
      if (corporateBuzzwords.includes(cleanWord)) {
        corporateWords++;
      }
    });

    return Math.min(Math.round((corporateWords / totalWords) * 100), 100);
  }

  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private splitIntoSentences(text: string): string[] {
    // Enhanced sentence boundary detection
    // Split on sentence endings but preserve the punctuation
    const sentences: string[] = [];
    let current = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      current += char;
      
      // Check for sentence endings
      if (char.match(/[.!?]/)) {
        // Look ahead to see if this is really the end of a sentence
        const nextChar = text[i + 1];
        const nextNextChar = text[i + 2];
        
        // Don't split on abbreviations like "Mr.", "Dr.", "etc."
        if (char === '.' && current.match(/\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc|i\.e|e\.g)\.$/) && nextChar !== ' ') {
          continue;
        }
        
        // Don't split on decimal numbers
        if (char === '.' && current.match(/\d\.$/) && nextChar && nextChar.match(/\d/)) {
          continue;
        }
        
        // If next character is whitespace or end of string, this is likely a sentence boundary
        if (!nextChar || nextChar.match(/\s/) || (nextChar.match(/[A-Z]/) && nextNextChar && nextNextChar.match(/[a-z]/))) {
          sentences.push(current.trim());
          current = '';
          // Skip whitespace after sentence ending
          while (i + 1 < text.length && text[i + 1].match(/\s/)) {
            i++;
          }
        }
      }
    }
    
    // Add any remaining text
    if (current.trim()) {
      sentences.push(current.trim());
    }
    
    return sentences.filter(s => s.length > 0);
  }

  private translateSentence(sentence: string, direction: TranslationDirection): {
    output: string;
    translationCount: number;
    exactMatches: number;
  } {
    const words = sentence.split(/\s+/);
    let result = sentence;
    let translationCount = 0;
    let exactMatches = 0;

    // Combine regular translations with easter eggs for comprehensive matching
    const allTranslations = [...translations, ...easterEggs];

    // First, try exact phrase matches (longest first to avoid partial replacements)
    const sortedTranslations = [...allTranslations].sort((a, b) => {
      const aSource = direction === 'corporate-to-honest' ? (a.corporate || '') : (a.honest || '');
      const bSource = direction === 'corporate-to-honest' ? (b.corporate || '') : (b.honest || '');
      return bSource.length - aSource.length;
    });

    for (const translation of sortedTranslations) {
      const source = direction === 'corporate-to-honest' ? translation.corporate : translation.honest;
      const target = direction === 'corporate-to-honest' ? translation.honest : translation.corporate;
      
      if (!source || !target) continue;
      
      const regex = new RegExp(`\\b${this.escapeRegex(source)}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, target);
        translationCount++;
        exactMatches++;
      }
    }

    // If no exact matches, try fuzzy matching for individual words
    if (translationCount === 0) {
      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        for (const translation of allTranslations) {
          const source = direction === 'corporate-to-honest' ? translation.corporate : translation.honest;
          const target = direction === 'corporate-to-honest' ? translation.honest : translation.corporate;
          
          if (!source || !target) continue;
          
          if (source.toLowerCase().includes(cleanWord.toLowerCase()) && cleanWord.length > 3) {
            const wordRegex = new RegExp(`\\b${this.escapeRegex(cleanWord)}\\b`, 'gi');
            result = result.replace(wordRegex, target);
            translationCount++;
            break;
          }
        }
      });
    }

    return {
      output: result,
      translationCount,
      exactMatches
    };
  }
}
