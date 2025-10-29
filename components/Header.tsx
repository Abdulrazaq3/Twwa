import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BellIcon } from './icons';
import { NAV_LINKS } from '../constants';

const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo (first item, will be on the right in RTL) */}
        <Link to="/" title="العودة إلى الصفحة الرئيسية">
          <img 
            src="https://i.postimg.cc/vTmcZT0R/new-6o3-logo.png" 
            alt="شعار جمعية طوع التطوعية" 
            className="h-12" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-bold transition-colors pb-1 border-b-2 ${
                    isActive 
                      ? 'text-taww-primary border-taww-primary' 
                      : 'text-gray-600 border-transparent hover:text-taww-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
          ))}
        </nav>
        
        {/* Notifications Icon (second item, will be on the left in RTL) */}
        <button className="relative p-2 rounded-full hover:bg-gray-200 transition-colors btn-press" aria-label="الإشعارات">
          <BellIcon className="h-7 w-7 text-gray-600" />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;