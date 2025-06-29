import React from 'react';
import { Building2, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-corporate-900 to-corporate-700 text-white py-6 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-2">
          {/* <Building2 className="w-8 h-8 text-corporate-200" /> */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Corporate Buzzword Translator 3000™
          </h1>
          <Zap className="w-8 h-8 text-yellow-400 animate-bounce-subtle" />
        </div>
        <p className="text-center text-corporate-200 text-lg font-medium">
          "Decoding the corporate matrix, one synergy at a time"
        </p>
        <div className="text-center mt-2">
          <span className="inline-block bg-corporate-800 px-3 py-1 rounded-full text-sm text-corporate-100">
            Patent Pending™ • Enterprise Ready • Blockchain Enabled
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;