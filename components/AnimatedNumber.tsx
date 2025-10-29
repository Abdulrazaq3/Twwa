import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const currentValue = Math.floor(easedProgress * (value - startValue) + startValue);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
            setDisplayValue(0);
            startTime = null;
            requestAnimationFrame(animate);
            observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={elementRef}>{displayValue.toLocaleString('ar-EG')}</span>;
};

export default AnimatedNumber;