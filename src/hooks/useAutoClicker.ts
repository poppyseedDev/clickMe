// useAutoClickers.ts
import { useState, useEffect } from 'react';

const useAutoClickers = (initialAutoClickers: number, cookieIncrement: (increment: number) => void) => {
  const [autoClickers, setAutoClickers] = useState(initialAutoClickers);

  useEffect(() => {
    const interval = setInterval(() => {
      cookieIncrement(autoClickers);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers, cookieIncrement]);

  return { autoClickers, setAutoClickers };
};

export default useAutoClickers;
