import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const PageTitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const currentLink = NAV_LINKS.find(link => link.path === location.pathname);
    const pageName = currentLink ? currentLink.name : '';
    
    if (pageName) {
      document.title = `${pageName} | جمعية طوع التطوعية`;
    } else if (location.pathname === '/') {
        // Default title for home
        document.title = 'الرئيسية | جمعية طوع التطوعية';
    }
    else {
      // Fallback for any other page not in nav links
      document.title = 'جمعية طوع التطوعية';
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default PageTitleUpdater;