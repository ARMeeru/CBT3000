import React, { useEffect, useState } from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface BullshitMeterProps {
  level: number;
  isAnimating?: boolean;
}

const BullshitMeter: React.FC<BullshitMeterProps> = ({ level, isAnimating = false }) => {
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayLevel(level);
    }, 100);
    return () => clearTimeout(timer);
  }, [level]);

  const getColorClass = (level: number): string => {
    if (level < 20) return 'from-green-400 to-green-600';
    if (level < 40) return 'from-yellow-400 to-yellow-600';
    if (level < 60) return 'from-orange-400 to-orange-600';
    if (level < 80) return 'from-red-400 to-red-600';
    return 'from-bullshit-500 to-bullshit-700';
  };

  const getStatusText = (level: number): string => {
    if (level === 0) return 'Refreshingly Honest';
    if (level < 20) return 'Minimal BS Detected';
    if (level < 40) return 'Corporate Speak Rising';
    if (level < 60) return 'Buzzword Alert!';
    if (level < 80) return 'Peak Corporate Mode';
    return 'MAXIMUM SYNERGY OVERLOAD!';
  };

  const getIcon = (level: number) => {
    if (level < 40) return <TrendingUp className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5 animate-bullshit-pulse" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          {getIcon(displayLevel)}
          <span>Bullshit Meter™</span>
        </h3>
        <div className="text-2xl font-bold text-gray-700">
          {displayLevel}%
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getColorClass(displayLevel)} transition-all duration-1000 ease-out ${
              isAnimating ? 'animate-gauge-fill' : ''
            }`}
            style={{ width: `${displayLevel}%` }}
          >
            <div className="h-full bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Meter ticks */}
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          displayLevel < 40 
            ? 'bg-green-100 text-green-800' 
            : displayLevel < 80 
            ? 'bg-orange-100 text-orange-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {getStatusText(displayLevel)}
        </span>
      </div>
      
      {displayLevel > 80 && (
        <div className="mt-2 text-xs text-center text-gray-600 italic">
          ⚠️ Warning: May cause excessive eye-rolling
        </div>
      )}
    </div>
  );
};

export default BullshitMeter;