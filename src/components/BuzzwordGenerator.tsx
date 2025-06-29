import React, { useState } from 'react';
import { Shuffle, Copy, Zap } from 'lucide-react';
import { BuzzwordGenerator as Generator } from '../utils/buzzwordGenerator';
import { useClipboard } from '../hooks/useClipboard';

const BuzzwordGenerator: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generator = Generator.getInstance();
  const { copied, copyToClipboard } = useClipboard();

  const generatePhrase = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentPhrase(generator.generatePhrase());
      setIsGenerating(false);
    }, 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>Buzzword Generator</span>
        </h3>
        <button
          onClick={generatePhrase}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-corporate-600 to-corporate-700 text-white rounded-lg hover:from-corporate-700 hover:to-corporate-800 transition-all duration-200 disabled:opacity-50"
        >
          <Shuffle className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
        </button>
      </div>
      
      {currentPhrase && (
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-corporate-50 to-corporate-100 rounded-lg border border-corporate-200">
            <p className="text-gray-800 font-medium leading-relaxed">
              "{currentPhrase}"
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 italic">
              Generated with 100% authentic corporate synergy
            </span>
            <button
              onClick={() => copyToClipboard(currentPhrase)}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-corporate-600 hover:text-corporate-700 transition-colors duration-200"
            >
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </button>
          </div>
          
          {copied && (
            <div className="text-xs text-green-600 text-center">
              ✓ Corporate wisdom copied!
            </div>
          )}
        </div>
      )}
      
      {!currentPhrase && (
        <div className="text-center py-8 text-gray-500">
          <p>Click Generate to create premium corporate buzzword combinations</p>
          <p className="text-sm mt-1">Perfect for meetings, emails, and LinkedIn posts!</p>
        </div>
      )}
    </div>
  );
};

export default BuzzwordGenerator;