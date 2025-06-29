import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { TranslationHistory, BuzzwordBingoCard } from '../types';

interface CorpBuzzDB extends DBSchema {
  translationHistory: {
    key: string;
    value: TranslationHistory;
    indexes: { 'by-timestamp': number };
  };
  favorites: {
    key: string;
    value: TranslationHistory;
    indexes: { 'by-timestamp': number };
  };
  bingoCards: {
    key: string;
    value: BuzzwordBingoCard;
    indexes: { 'by-createdAt': number };
  };
}

let dbPromise: Promise<IDBPDatabase<CorpBuzzDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<CorpBuzzDB>('corp-buzzword-db', 1, {
      upgrade(db) {
        db.createObjectStore('translationHistory', { keyPath: 'id' })
          .createIndex('by-timestamp', 'timestamp');
        db.createObjectStore('favorites', { keyPath: 'id' })
          .createIndex('by-timestamp', 'timestamp');
        db.createObjectStore('bingoCards', { keyPath: 'id' })
          .createIndex('by-createdAt', 'createdAt');
      },
    });
  }
  return dbPromise;
}
