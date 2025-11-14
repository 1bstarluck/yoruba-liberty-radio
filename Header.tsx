
import React from 'react';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
  logoUrl: string | null;
  isLivePlaying: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount, logoUrl, isLivePlaying, theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-30 bg-blue-900 dark:bg-gray-900 text-white shadow-md">
      <div className="h-24 flex items-center justify-between px-4">
        {logoUrl ? (
            <img src={logoUrl} alt="Yoruba Liberty Radio Logo" className="w-16 h-16 object-contain flex-shrink-0" />
        ) : (
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-lg flex-shrink-0">
                YLR
            </div>
        )}
        <div className="text-center flex-grow px-2">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-xl font-extrabold tracking-tight">YORUBA LIBERTY RADIO</h1>
            {isLivePlaying && (
              <span className="relative flex h-3 w-3" aria-label="Live stream is active">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-yellow-300">IROYIN ITANIJI</p>
          <p className="text-xs text-gray-300 mt-1">International Shortwave Broadcasting Service</p>
        </div>
        <div className="flex items-center space-x-1">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-blue-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button onClick={onCartClick} className="relative p-2 rounded-full text-yellow-400 hover:bg-blue-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white">
            <ShoppingCartIcon />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                {cartCount}
                </span>
            )}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;