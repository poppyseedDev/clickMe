// CookieClickerControls.tsx
import React from 'react';
import { CookieClickerControlsProps } from '@/types';

const CookieClickerControls: React.FC<CookieClickerControlsProps> = ({
     cookies, autoClickers, autoClickerCost, onBuyAutoClicker 
    }) => {
  return (
    <>
      <p>You have {cookies} cookies</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onBuyAutoClicker}
        disabled={cookies < autoClickerCost}
      >
        Buy Auto-Clicker (Cost: {autoClickerCost} cookies)
      </button>
      <p>Auto-Clickers: {autoClickers}</p>
    </>
  );
};

export default CookieClickerControls;
