// CookieClickerControls.tsx
import React from 'react';
import { CookieClickerControlsProps } from '@/types';
import { AUTO_CLICKER_COST, INCREMENT_CLICK_POWER } from '@/constants/clickers';

const CookieClickerControls: React.FC<CookieClickerControlsProps> = ({
     cookies, autoClickers, clickPower, onBuyAutoClicker 
    }) => {
  return (
    <>
      <p>You have {cookies} bobas</p>
      <div className='flex flex-col space-y-2'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBuyAutoClicker}
          disabled={cookies < AUTO_CLICKER_COST * (autoClickers + 1)}
        >
          Buy Auto-Clicker (Cost: {AUTO_CLICKER_COST * (autoClickers + 1)} bobas)
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBuyAutoClicker}
          disabled={cookies < INCREMENT_CLICK_POWER * (clickPower + 1)}
        >
          Increase Your Click Power (Cost: {INCREMENT_CLICK_POWER * (clickPower + 1)} bobas)
        </button>

      </div>
      <p>Auto-Click: {autoClickers}</p>
      <p>ClickPower: {clickPower}</p>
    </>
  );
};

export default CookieClickerControls;
