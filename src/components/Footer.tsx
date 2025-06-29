import React from 'react';
import { Github, Twitter, Linkedin, AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-3">Corporate Buzzword Translator 3000™</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Disrupting the paradigm of corporate communication through innovative 
              synergy-based translation solutions. Patent pending in 47 countries.
            </p>
            <div className="mt-4 flex space-x-3">
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>
          
          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3">Enterprise Features</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Real-time BS Detection</li>
              <li>• Cloud-based Synergy Analytics</li>
              <li>• Blockchain-enabled Buzzwords</li>
              <li>• AI-powered Paradigm Shifts</li>
              <li>• Mobile-first Corporate Speak</li>
              <li>• ISO 9001 Certified Translations</li>
            </ul>
          </div>
          
          {/* Disclaimers */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
              Important Disclaimers
            </h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Not responsible for career damage</li>
              <li>• Use at your own risk in actual meetings</li>
              <li>• May cause excessive eye-rolling</li>
              <li>• Side effects include clarity about workplace dynamics</li>
              <li>• This product has not been evaluated by the SEC</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Corporate Buzzword Translator 3000™. All rights reserved. 
            <span className="block mt-1">
              "Leveraging synergistic paradigms to optimize your communication bandwidth since 2025"
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;