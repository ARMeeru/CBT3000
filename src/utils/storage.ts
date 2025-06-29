import { getDB } from './db';
import { TranslationHistory, BuzzwordBingoCard } from '../types';

export class StorageManager {
  private static instance: StorageManager;
  
  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // Translation History
  async saveTranslation(history: Omit<TranslationHistory, 'id'>): Promise<void> {
    const db = await getDB();
    const newTranslation: TranslationHistory = {
      ...history,
      id: this.generateId(),
    };
    await db.add('translationHistory', newTranslation);
    // Keep only last 50
    const all = await this.getTranslationHistory();
    if (all.length > 50) {
      const toDelete = all.slice(50);
      for (const item of toDelete) {
        await db.delete('translationHistory', item.id);
      }
    }
  }

  async getTranslationHistory(): Promise<TranslationHistory[]> {
    const db = await getDB();
    const all = await db.getAll('translationHistory');
    return all.sort((a, b) => b.timestamp - a.timestamp);
  }

  async clearTranslationHistory(): Promise<void> {
    const db = await getDB();
    await db.clear('translationHistory');
  }

  // Clean up existing data that doesn't meet new criteria
  async cleanupIncompleteTranslations(): Promise<number> {
    const db = await getDB();
    const all = await this.getTranslationHistory();
    let removedCount = 0;

    for (const translation of all) {
      if (!this.isCompleteTranslation(translation.input)) {
        await db.delete('translationHistory', translation.id);
        removedCount++;
      }
    }

    return removedCount;
  }

  // Helper function to check if a translation meets the new criteria
  private isCompleteTranslation(text: string): boolean {
    const trimmed = text.trim();
    
    // Don't save if text is too short or empty
    if (trimmed.length < 5) return false;
    
    // Only save if the sentence appears complete:
    // 1. Ends with proper punctuation (. ! ? : ;)
    // 2. Has at least 2 words
    // 3. Is not just a fragment
    const endsWithPunctuation = /[.!?:;]$/.test(trimmed);
    const hasMultipleWords = trimmed.split(/\s+/).length >= 2;
    const isNotJustFragment = trimmed.length >= 10;
    
    return endsWithPunctuation && hasMultipleWords && isNotJustFragment;
  }

  // Favorites
  async saveFavorite(translation: Omit<TranslationHistory, 'id'>): Promise<void> {
    const db = await getDB();
    const newFavorite: TranslationHistory = {
      ...translation,
      id: this.generateId(),
    };
    // Check if already exists
    const all = await this.getFavorites();
    const exists = all.some(fav => fav.input === translation.input && fav.direction === translation.direction);
    if (!exists) {
      await db.add('favorites', newFavorite);
    }
  }

  async getFavorites(): Promise<TranslationHistory[]> {
    const db = await getDB();
    const all = await db.getAll('favorites');
    return all.sort((a, b) => b.timestamp - a.timestamp);
  }

  async removeFavorite(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('favorites', id);
  }

  // Clean up favorites that don't meet new criteria
  async cleanupIncompleteFavorites(): Promise<number> {
    const db = await getDB();
    const all = await this.getFavorites();
    let removedCount = 0;

    for (const favorite of all) {
      if (!this.isCompleteTranslation(favorite.input)) {
        await db.delete('favorites', favorite.id);
        removedCount++;
      }
    }

    return removedCount;
  }

  // Clean up all incomplete data
  async cleanupAllIncompleteData(): Promise<{historyRemoved: number, favoritesRemoved: number}> {
    const historyRemoved = await this.cleanupIncompleteTranslations();
    const favoritesRemoved = await this.cleanupIncompleteFavorites();
    
    return { historyRemoved, favoritesRemoved };
  }

  async isFavorite(input: string, direction: string): Promise<boolean> {
    const all = await this.getFavorites();
    return all.some(fav => fav.input === input && fav.direction === direction);
  }

  // Bingo Cards
  saveBingoCard(card: Omit<BuzzwordBingoCard, 'id'>): string {
    const cards = this.getBingoCards();
    const newCard: BuzzwordBingoCard = {
      ...card,
      id: this.generateId(),
    };
    
    cards.unshift(newCard);
    localStorage.setItem('bingoCards', JSON.stringify(cards));
    return newCard.id;
  }

  getBingoCards(): BuzzwordBingoCard[] {
    const stored = localStorage.getItem('bingoCards');
    return stored ? JSON.parse(stored) : [];
  }

  updateBingoCard(id: string, checkedWords: boolean[]): void {
    const cards = this.getBingoCards();
    const cardIndex = cards.findIndex(card => card.id === id);
    
    if (cardIndex !== -1) {
      cards[cardIndex].checkedWords = checkedWords;
      localStorage.setItem('bingoCards', JSON.stringify(cards));
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}