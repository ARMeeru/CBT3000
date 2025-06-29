import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeftRight, Copy, Heart, RotateCcw, Share2, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import { TranslationEngine } from '../utils/translator';
import { StorageManager } from '../utils/storage';
import { useClipboard } from '../hooks/useClipboard';
import { TranslationDirection, TranslationResult, TranslationSuggestion } from '../types';

interface TranslationInterfaceProps {
  onBullshitLevelChange: (level: number) => void;
}

const TranslationInterface: React.FC<TranslationInterfaceProps> = ({ onBullshitLevelChange }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [translationResult, setTranslationResult] = useState<TranslationResult>({
    output: '',
    confidence: 0,
    suggestions: [],
    isEasterEgg: false
  });
  const [direction, setDirection] = useState<TranslationDirection>('corporate-to-honest');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderMessage, setPlaceholderMessage] = useState('');
  
  const translator = TranslationEngine.getInstance();
  const storage = StorageManager.getInstance();
  const { copied, copyToClipboard } = useClipboard();

  // Add a new state for selected suggestion
  const [selectedSuggestion, setSelectedSuggestion] = useState<TranslationSuggestion | null>(null);

  // Helper: should save to history
  const shouldSaveToHistory = (text: string, triggeredBySuggestion = false) => {
    if (triggeredBySuggestion) return true;
    // Save if ends with . ! ? or user pressed Enter (handled in onKeyDown)
    return /[.!?]$/.test(text.trim());
  };

  // Update translate to be async, add param for suggestion
  const translate = useCallback(async (text: string, triggeredBySuggestion = false) => {
    setIsLoading(true);
    setPlaceholderMessage(translator.getRandomWittyMessage('loading'));
    setShowSuggestions(false);

    setTimeout(async () => {
      if (!text.trim()) {
        setOutputText('');
        setPlaceholderMessage(translator.getRandomWittyMessage('empty'));
        onBullshitLevelChange(0);
        setIsLoading(false);
        return;
      }

      const result = translator.translate(text, direction);
      setTranslationResult(result);
      setOutputText(result.output);
      setShowSuggestions(result.suggestions && result.suggestions.length > 0);
      setIsLoading(false);

      // Calculate bullshit level based on input for corporate-to-honest, output for honest-to-corporate
      const bullshitText = direction === 'corporate-to-honest' ? text : result.output;
      const bullshitLevel = translator.calculateBullshitLevel(bullshitText);
      onBullshitLevelChange(bullshitLevel);

      // Save to history only if meaningful
      if (shouldSaveToHistory(text, triggeredBySuggestion)) {
        await storage.saveTranslation({
          input: text,
          output: result.output,
          direction,
          timestamp: Date.now(),
        });
      }
    }, 400); // Simulate loading
  }, [direction, translator, storage, onBullshitLevelChange]);

  // Handle Enter key in textarea
  const handleInputKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await translate(inputText, true);
    }
  };

  // Update translate on input change
  useEffect(() => {
    (async () => {
      // Only auto-translate, but don't save to history
      await translate(inputText, false);
    })();
  }, [inputText, translate]);

  useEffect(() => {
    (async () => {
      setIsFavorite(await storage.isFavorite(inputText, direction));
    })();
  }, [inputText, direction, storage]);

  const handleDirectionToggle = () => {
    const newDirection: TranslationDirection = 
      direction === 'corporate-to-honest' ? 'honest-to-corporate' : 'corporate-to-honest';
    setDirection(newDirection);
    
    // Swap input and output
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    onBullshitLevelChange(0);
  };

  const handleFavorite = async () => {
    if (inputText.trim()) {
      if (isFavorite) {
        // Remove from favorites
        const favorites = await storage.getFavorites();
        const match = favorites.find(fav => fav.input === inputText && fav.direction === direction);
        if (match) {
          await storage.removeFavorite(match.id);
        }
        setIsFavorite(false);
      } else {
        await storage.saveFavorite({
          input: inputText,
          output: outputText,
          direction,
          timestamp: Date.now(),
        });
        setIsFavorite(true);
      }
    }
  };

  const handleShare = async () => {
    const shareText = `"${inputText}" translates to "${outputText}" - Corporate Buzzword Translator 3000™`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Corporate Translation',
          text: shareText,
        });
      } catch (err) {
        // Fallback to clipboard
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const getPlaceholderText = () => {
    if (direction === 'corporate-to-honest') {
      return "Enter corporate speak (e.g., 'Let's circle back on this')";
    }
    return "Enter honest thoughts (e.g., 'This is stupid')";
  };

  const getOutputPlaceholder = () => {
    if (direction === 'corporate-to-honest') {
      return "Honest translation will appear here...";
    }
    return "Corporate-safe version will appear here...";
  };

  // Add handler for suggestion click
  const handleSuggestionClick = (suggestion: TranslationSuggestion) => {
    setInputText(suggestion.text);
    setSelectedSuggestion(suggestion);
    setShowSuggestions(false);
    // Save to history for suggestion
    translate(suggestion.text, true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-corporate-50 to-corporate-100 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {direction === 'corporate-to-honest' ? 'Corporate → Honest' : 'Honest → Corporate'}
          </h2>
          <button
            onClick={handleDirectionToggle}
            className="flex items-center space-x-2 px-4 py-2 bg-corporate-600 text-white rounded-lg hover:bg-corporate-700 transition-colors duration-200"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Switch</span>
          </button>
        </div>
      </div>

      {/* Translation Areas */}
      <div className="grid md:grid-cols-2 gap-4 p-6">
        {/* Input Area */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {direction === 'corporate-to-honest' ? 'Corporate Speak' : 'Honest Thoughts'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={getPlaceholderText()}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-500 focus:border-transparent resize-none transition-all duration-200"
          />
          <div className="text-xs text-gray-500">
            {inputText.length} characters
          </div>
          {/* Suggestions Dropdown */}
          {showSuggestions && translationResult.suggestions.length > 0 && (
            <div className="relative z-10 mt-1">
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {translationResult.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left px-4 py-2 hover:bg-corporate-50 text-gray-700 text-sm"
                  >
                    <span className="font-medium">{suggestion.text}</span>
                    <span className="ml-2 text-xs text-gray-400">{suggestion.confidence}% match</span>
                    {suggestion.isExact && <span className="ml-2 text-green-500">(Exact)</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output Area */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {direction === 'corporate-to-honest' ? 'Honest Translation' : 'Corporate Translation'}
          </label>
          <div className="relative">
            <textarea
              value={isLoading ? '' : outputText}
              readOnly
              placeholder={isLoading ? placeholderMessage : getOutputPlaceholder()}
              className={`w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none ${isLoading ? 'animate-pulse text-gray-400' : ''}`}
            />
            {outputText && !isLoading && (
              <button
                onClick={() => copyToClipboard(outputText)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {outputText.length} characters
          </div>
          {/* Confidence Indicator */}
          {!isLoading && outputText && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full ${translationResult.confidence > 80 ? 'bg-green-400' : translationResult.confidence > 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${translationResult.confidence}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">Confidence: {translationResult.confidence}%</span>
            </div>
          )}
          {/* Easter Egg UI */}
          {translationResult.isEasterEgg && !isLoading && (
            <div className="flex items-center gap-2 mt-2 text-purple-600 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Easter Egg Unlocked!</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleClear}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
          
          {inputText.trim() && (
            <>
              <button
                onClick={handleFavorite}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isFavorite
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-corporate-100 text-corporate-700 rounded-lg hover:bg-corporate-200 transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </>
          )}
          
          {copied && (
            <div className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
              ✓ Copied to clipboard!
            </div>
          )}
        </div>
      </div>

      {/* Witty error state */}
      {!isLoading && !inputText.trim() && (
        <div className="px-6 pb-4 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {placeholderMessage || translator.getRandomWittyMessage('empty')}
        </div>
      )}
      {/* Witty error for no translation */}
      {!isLoading && inputText.trim() && !outputText && (
        <div className="px-6 pb-4 text-center text-red-400 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {translator.getRandomWittyMessage('error')}
        </div>
      )}
    </div>
  );
};

export default TranslationInterface;
