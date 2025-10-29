import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsExiting(false);
            setIsVisible(true);
        } else {
            setIsExiting(true);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-24 md:bottom-6 left-6 z-50 p-3 bg-taww-primary text-white rounded-full shadow-lg hover:bg-taww-secondary transition-all duration-300 btn-press focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-taww-primary ${isExiting ? 'animate-fade-out-btt' : 'animate-fade-in-btt'}`}
            aria-label="العودة إلى الأعلى"
        >
            <ArrowUpIcon className="h-6 w-6" />
        </button>
    );
};

export default BackToTopButton;