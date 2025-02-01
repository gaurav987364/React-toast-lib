// setInterval runs every 10ms, which is too frequent and resource-intensive.
// useEffect could be optimized for dependency changes.


import { useEffect, useRef, useState } from "react";

export const useProgressBar = (
    shouldRun: boolean, 
    duration: number
  ) => {
    const [progress, setProgress] = useState(100);
    const startTimeRef = useRef(Date.now());
  
    useEffect(() => {
      if (!shouldRun || duration <= 0) return;
  
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = duration - elapsed;
        
        setProgress((remaining / duration) * 100);
  
        if (remaining <= 0) {
          clearInterval(interval);
          setProgress(0);
        }
      }, 10);
  
      return () => clearInterval(interval);
    }, [shouldRun, duration]);
  
    return progress;
};
