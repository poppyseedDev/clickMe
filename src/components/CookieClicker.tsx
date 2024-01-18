import React, { useState, useEffect } from 'react';

const CookieClicker: React.FC = () => {
  const [cookies, setCookies] = useState(() => parseInt(localStorage.getItem('cookies') || '0'));
  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [autoClickerCost, setAutoClickerCost] = useState(100);
  const [autoClickers, setAutoClickers] = useState(() => parseInt(localStorage.getItem('autoClickers') || '0'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((currentCookies) => {
        const newCookies = currentCookies + autoClickers;
        localStorage.setItem('cookies', newCookies.toString());
        return newCookies;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers]);

  const buyAutoClicker = () => {
    if (cookies >= autoClickerCost) {
      setCookies((currentCookies) => {
        localStorage.setItem('cookies', (currentCookies - autoClickerCost).toString());
        return currentCookies - autoClickerCost;
      });
      setAutoClickerCost(autoClickerCost * 2);
      setAutoClickers((currentAutoClickers) => {
        const newAutoClickers = currentAutoClickers + 1;
        localStorage.setItem('autoClickers', newAutoClickers.toString());
        return newAutoClickers;
      });
    }
  };

  const handleClick = () => {
    setCookies((currentCookies) => {
      const newCookies = currentCookies + cookiesPerClick;
      localStorage.setItem('cookies', newCookies.toString());
      return newCookies;
    });
  };

  return (
    <div className="p-4">
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded animate-clickAnimation"
        onClick={handleClick}
      >
        Click me!
      </button>
      <p>You have {cookies} cookies</p>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={buyAutoClicker}
        disabled={cookies < autoClickerCost}
      >
        Buy Auto-Clicker (Cost: {autoClickerCost} cookies)
      </button>
      <p>Auto-Clickers: {autoClickers}</p>
    </div>
  );
};

export default CookieClicker;
