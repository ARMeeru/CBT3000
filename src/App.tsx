import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TranslationInterface from './components/TranslationInterface';
import BullshitMeter from './components/BullshitMeter';
import BuzzwordGenerator from './components/BuzzwordGenerator';
import BuzzwordBingo from './components/BuzzwordBingo';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';
import { Grid as Grid3X3 } from 'lucide-react';

function App() {
  const [bullshitLevel, setBullshitLevel] = useState(0);
  const [isBingoOpen, setIsBingoOpen] = useState(false);
  
  // Sarcastic subtexts for rotating display
  const sarcasticSubtexts = [
    "*Data as reliable as corporate culture promises",
    "*Statistics verified by the same team that said 'we're all family'",
    "*Accuracy guaranteed by our synergistic paradigm shift methodology",
    "*These numbers are totally not made up (wink wink)"
  ];
  
  const [currentSubtextIndex, setCurrentSubtextIndex] = useState(0);
  
  // Rotate sarcastic subtext every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtextIndex((prevIndex) => 
        (prevIndex + 1) % sarcasticSubtexts.length
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [sarcasticSubtexts.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Translation Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TranslationInterface onBullshitLevelChange={setBullshitLevel} />
          </div>
          <div className="space-y-6">
            <BullshitMeter level={bullshitLevel} isAnimating={bullshitLevel > 0} />
            
            {/* Bingo Button */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 text-center">
              <button
                onClick={() => setIsBingoOpen(true)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Grid3X3 className="w-5 h-5" />
                <span>Play Buzzword Bingo!</span>
              </button>
              <p className="text-xs text-gray-600 mt-2 italic">
                Perfect for meetings and conference calls
              </p>
            </div>
          </div>
        </div>
        
        {/* Secondary Features */}
        <div className="grid lg:grid-cols-2 gap-6">
          <BuzzwordGenerator />
          <HistoryPanel />
        </div>
        
        {/* Fun Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            📊 Real-time Corporate Speak Analytics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-corporate-50 rounded-lg">
              <div className="text-2xl font-bold text-corporate-600">500K+</div>
              <div className="text-xs text-gray-600">Buzzwords Translated</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <div className="text-xs text-gray-600">Synergy Accuracy</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">∞</div>
              <div className="text-xs text-gray-600">Paradigms Shifted</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">247</div>
              <div className="text-xs text-gray-600">Eye Rolls Prevented</div>
            </div>
          </div>
          
          {/* Rotating sarcastic subtext */}
          <p className="text-xs text-gray-400 mt-4 text-center italic transition-opacity duration-500">
            {sarcasticSubtexts[currentSubtextIndex]}
          </p>
        </div>
      </main>
      
      <Footer />
      
      {/* Buzzword Bingo Modal */}
      <BuzzwordBingo 
        isOpen={isBingoOpen} 
        onClose={() => setIsBingoOpen(false)} 
      />
    </div>
  );
}

export default App;