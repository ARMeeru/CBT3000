import React, { useState } from 'react';
import { Grid as Grid3X3, RotateCcw, Trophy, X } from 'lucide-react';
import { bingoWords } from '../data/translations';
import { StorageManager } from '../utils/storage';

interface BuzzwordBingoProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuzzwordBingo: React.FC<BuzzwordBingoProps> = ({ isOpen, onClose }) => {
  const [bingoCard, setBingoCard] = useState<string[]>([]);
  const [checkedWords, setCheckedWords] = useState<boolean[]>([]);
  const [hasWon, setHasWon] = useState(false);
  
  const storage = StorageManager.getInstance();

  const generateNewCard = () => {
    const shuffled = [...bingoWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 25);
    setBingoCard(selected);
    setCheckedWords(new Array(25).fill(false));
    setHasWon(false);
    
    // Save to storage
    storage.saveBingoCard({
      words: selected,
      checkedWords: new Array(25).fill(false),
      createdAt: Date.now(),
    });
  };

  const toggleWord = (index: number) => {
    const newChecked = [...checkedWords];
    newChecked[index] = !newChecked[index];
    setCheckedWords(newChecked);
    
    // Check for win conditions
    checkForWin(newChecked);
  };

  const checkForWin = (checked: boolean[]) => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      const row = checked.slice(i * 5, (i + 1) * 5);
      if (row.every(Boolean)) {
        setHasWon(true);
        return;
      }
    }
    
    // Check columns
    for (let i = 0; i < 5; i++) {
      const column = [0, 1, 2, 3, 4].map(row => checked[row * 5 + i]);
      if (column.every(Boolean)) {
        setHasWon(true);
        return;
      }
    }
    
    // Check diagonals
    const diagonal1 = [0, 6, 12, 18, 24].map(i => checked[i]);
    const diagonal2 = [4, 8, 12, 16, 20].map(i => checked[i]);
    
    if (diagonal1.every(Boolean) || diagonal2.every(Boolean)) {
      setHasWon(true);
      return;
    }
  };

  React.useEffect(() => {
    if (isOpen && bingoCard.length === 0) {
      generateNewCard();
    }
  }, [isOpen, bingoCard.length]);

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Grid3X3 className="w-6 h-6 text-corporate-600" />
            <h2 className="text-xl font-bold text-gray-800">Buzzword Bingo</h2>
            {hasWon && <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={generateNewCard}
              className="flex items-center space-x-2 px-3 py-1 bg-corporate-100 text-corporate-700 rounded-lg hover:bg-corporate-200 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Card</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Bingo Card */}
        <div className="p-6">
          {hasWon && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border border-yellow-300 text-center">
              <h3 className="text-xl font-bold text-yellow-800 flex items-center justify-center space-x-2">
                <Trophy className="w-6 h-6" />
                <span>BINGO! Maximum Synergy Achieved!</span>
                <Trophy className="w-6 h-6" />
              </h3>
              <p className="text-yellow-700 mt-1">
                You've successfully identified peak corporate speak. Your paradigm-shifting skills are world-class!
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            {bingoCard.map((word, index) => (
              <button
                key={index}
                onClick={() => toggleWord(index)}
                className={`aspect-square p-2 text-xs font-medium rounded-lg border-2 transition-all duration-200 ${
                  checkedWords[index]
                    ? 'bg-corporate-600 text-white border-corporate-600 shadow-lg transform scale-95'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-corporate-400 hover:bg-corporate-50'
                }`}
              >
                <div className="flex items-center justify-center h-full text-center leading-tight">
                  {word}
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>Instructions:</strong> Click words as you hear them in meetings. Get 5 in a row to win!
            </p>
            <p className="text-xs italic">
              Warning: Playing this during actual meetings may cause uncontrollable laughter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuzzwordBingo;