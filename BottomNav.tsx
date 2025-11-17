
import React from 'react';
import { Page } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ShopIcon } from './icons/ShopIcon';
import { NewsIcon } from './icons/NewsIcon';
import { MenuIcon } from './icons/MenuIcon';
import { ChatIcon } from './icons/ChatIcon';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { page: Page.Home, Icon: HomeIcon },
  { page: Page.News, Icon: NewsIcon },
  { page: Page.QA, Icon: ChatIcon },
  { page: Page.Shop, Icon: ShopIcon },
  { page: Page.More, Icon: MenuIcon },
];

const NavItem: React.FC<{ page: Page; Icon: React.FC; isActive: boolean; onClick: () => void }> = ({ page, Icon, isActive, onClick }) => (
  <button onClick={onClick} className="flex-1 flex flex-col items-center justify-center py-2 text-xs focus:outline-none transition-colors duration-200">
    <Icon />
    <span className={`mt-1 ${isActive ? 'font-bold text-blue-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`}>{page}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-3xl lg:max-w-5xl mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around h-16 shadow-top z-30">
      {navItems.map(item => (
        <NavItem
          key={item.page}
          page={item.page}
          Icon={item.Icon}
          isActive={activePage === item.page}
          onClick={() => setActivePage(item.page)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;