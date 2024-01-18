// CookieClickerControls.tsx
import React from 'react';
import { CookieClickerControlsProps } from '@/types';
import { AUTO_CLICKER_COST } from '@/constants/clickers';

const CookieClickerControls: React.FC<CookieClickerControlsProps> = ({
     cookies, autoClickers, onBuyAutoClicker 
    }) => {
  return (
    <>
      <p>You have {cookies} bobas</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onBuyAutoClicker}
        disabled={cookies < AUTO_CLICKER_COST * (autoClickers + 1)}
      >
        Buy Auto-Clicker (Cost: {AUTO_CLICKER_COST * (autoClickers + 1)} bobas)
      </button>
      <p>Auto-Clickers: {autoClickers}</p>
    </>
  );
};

export default CookieClickerControls;
