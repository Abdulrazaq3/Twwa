import React, { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [isExiting, setIsExiting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const finishedCalled = useRef(false);

  // Handle exit (fade out)
  const handleExit = () => {
    if (isExiting || finishedCalled.current) return;
    setIsExiting(true);
    setTimeout(() => {
      if (!finishedCalled.current) {
        onFinished();
        finishedCalled.current = true;
      }
    }, 500); // Match exit animation duration
  };

  // Auto-exit timer
  useEffect(() => {
    const timer = setTimeout(handleExit, 3500); // Slightly longer for staged animation
    return () => clearTimeout(timer);
  }, []);

  // Enhanced Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / (innerWidth / 2) * -1; // Move factor
      const moveY = (clientY - innerHeight / 2) / (innerHeight / 2) * -1; // Move factor

      // Apply different depths
      const logo = contentRef.current.querySelector('.splash-logo') as HTMLElement;
      const text = contentRef.current.querySelector('.splash-text') as HTMLElement;

      if (logo) {
        logo.style.transform = `translate(${moveX * 5}px, ${moveY * 5}px)`;
      }
      if (text) {
        text.style.transform = `translate(${moveX * 8}px, ${moveY * 8}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`splash-screen ${isExiting ? 'splash-exiting' : ''}`}
      onClick={handleExit}
    >
      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="particle" style={{
            '--x': `${Math.random() * 100}vw`,
            '--d': `${Math.random() * 20 + 15}s`, // Slower, more varied duration
            '--s': `${Math.random() * 2 + 0.5}px`, // Slightly larger max size
            '--dx': `${Math.random() * 100 - 50}px`, // Random horizontal drift
            '--o': `${Math.random() * 0.4 + 0.2}`, // Varied opacity (0.2 to 0.6)
            animationDelay: `${Math.random() * 15}s` // Staggered start over a wider range
          } as React.CSSProperties}></div>
        ))}
      </div>
      <div ref={contentRef} className="splash-content">
        <img
          src="https://i.postimg.cc/dVdY1hWH/6o3-logo.png"
          alt="شعار جمعية طوع التطوعية"
          className="splash-logo"
          style={{ transition: 'transform 0.3s ease-out' }}
        />
        <p className="splash-text" style={{ transition: 'transform 0.3s ease-out' }}>
          ﴿فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ﴾
        </p>
      </div>
       <div className="splash-prompt">
          <p>اضغط في أي مكان للاستمرار</p>
        </div>
    </div>
  );
};

export default SplashScreen;