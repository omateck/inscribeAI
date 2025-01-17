import React, { useState } from 'react';
import { Menu, X, PenLine } from 'lucide-react';
import NavLinks from './NavLinks';
import NavButtons from './NavButtons';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <PenLine className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Inscribe AI</span>
          </div>
          
          <NavLinks className="hidden md:flex space-x-8" />
          <NavButtons className="hidden md:flex items-center space-x-4" />

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        <MobileMenu isOpen={isMenuOpen} />
      </div>
    </header>
  );
};

export default Header;