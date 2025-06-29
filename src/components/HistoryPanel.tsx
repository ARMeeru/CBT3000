import React, { useState, useEffect } from 'react';
import { History, Heart, Trash2, Copy /*, Filter*/ } from 'lucide-react';
import { StorageManager } from '../utils/storage';
import { TranslationHistory } from '../types';
import { useClipboard } from '../hooks/useClipboard';

const HistoryPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [history, setHistory] = useState<TranslationHistory[]>([]);
  const [favorites, setFavorites] = useState<TranslationHistory[]>([]);
  
  const storage = StorageManager.getInstance();
  const { copied, copyToClipboard } = useClipboard();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setHistory(await storage.getTranslationHistory());
    setFavorites(await storage.getFavorites());
  };

  const clearHistory = async () => {
    await storage.clearTranslationHistory();
    await loadData();
  };

  // const cleanupIncompleteData = async () => {
  //   try {
  //     const result = await storage.cleanupAllIncompleteData();
  //     await loadData();
  //     
  //     if (result.historyRemoved > 0 || result.favoritesRemoved > 0) {
  //       alert(`Cleaned up ${result.historyRemoved} incomplete history items and ${result.favoritesRemoved} incomplete favorites.`);
  //     } else {
  //       alert('No incomplete data found to clean up.');
  //     }
  //   } catch (error) {
  //     console.error('Error cleaning up data:', error);
  //     alert('Error occurred while cleaning up data.');
  //   }
  // };

  const removeFavorite = async (id: string) => {
    await storage.removeFavorite(id);
    await loadData();
  };

  const formatDirection = (direction: string) => {
    return direction === 'corporate-to-honest' ? 'Corp → Honest' : 'Honest → Corp';
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderTranslationItem = (item: TranslationHistory, isFavorite = false) => (
    <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.direction === 'corporate-to-honest'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {formatDirection(item.direction)}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => copyToClipboard(`"${item.input}" → "${item.output}"`)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title="Copy translation"
          >
            <Copy className="w-4 h-4" />
          </button>
          {isFavorite && (
            <button
              onClick={() => removeFavorite(item.id)}
              className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
              title="Remove from favorites"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-700">Input:</span>
          <p className="text-gray-600 mt-1">"{item.input}"</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Output:</span>
          <p className="text-gray-600 mt-1">"{item.output}"</p>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        {formatTimestamp(item.timestamp)}
      </div>
    </div>
  );

  const handleTabChange = async (tab: 'history' | 'favorites') => {
    setActiveTab(tab);
    await loadData();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => handleTabChange('history')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'history'
                ? 'border-corporate-500 text-corporate-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </div>
          </button>
          <button
            onClick={() => handleTabChange('favorites')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'favorites'
                ? 'border-corporate-500 text-corporate-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {activeTab === 'history' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Translation History</h3>
              <div className="flex items-center space-x-2">
                {/* <button
                  onClick={cleanupIncompleteData}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  title="Remove incomplete sentences from history and favorites"
                >
                  <Filter className="w-3 h-3" />
                  <span>Cleanup</span>
                </button> */}
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            
            {history.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.slice(0, 10).map(item => renderTranslationItem(item))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No translations yet</p>
                <p className="text-sm">Start translating to see your history here</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Favorite Translations</h3>
            
            {favorites.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {favorites.map(item => renderTranslationItem(item, true))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No favorites yet</p>
                <p className="text-sm">Heart your favorite translations to save them here</p>
              </div>
            )}
          </div>
        )}
        
        {copied && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm animate-pulse">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied to clipboard!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;