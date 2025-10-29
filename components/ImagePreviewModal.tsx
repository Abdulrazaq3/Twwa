
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons';

interface ImagePreviewModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, altText, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const backdropAnimation = isClosing ? 'animate-fadeOut' : 'animate-fadeIn';
  const imageAnimation = isClosing ? 'animate-scaleOut' : 'animate-scaleIn';

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm ${backdropAnimation}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] ${imageAnimation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto object-contain max-h-[90vh] rounded-xl shadow-2xl"
        />
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 z-10 p-2 bg-white rounded-full text-gray-800 shadow-lg hover:bg-gray-200 transition-colors btn-press"
          aria-label="إغلاق"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
