// CookieClickerCanvas.tsx
import React, { useRef, useState } from 'react';
import { useCookieClicker } from '@/hooks/useCookieClicker';
import useAutoClickers from '@/hooks/useAutoClicker';
import useLocalStorage from '@/hooks/useLocalStorage';
import CookieClickerControls from '@/components/CookieClickerControls';

const CookieClickerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cookies, setCookies] = useLocalStorage('cookies', 0);
  const [cookiesPerClick, setCookiesPerClick] = useState<number>(1);
  const [autoClickerCost, setAutoClickerCost] = useState<number>(100);
  function incrementCookies(amount: number) {
    setCookies(cookies + amount);
  }

  const { autoClickers, setAutoClickers } = useAutoClickers(parseInt(localStorage.getItem('autoClickers') || '0'), incrementCookies);

  const { setFloatingTexts, setZoom } = useCookieClicker(canvasRef, cookies, autoClickers, () => incrementCookies(cookiesPerClick));

  const buyAutoClicker = () => {
    if (cookies >= autoClickerCost) {
      setCookies(cookies - autoClickerCost);
      setAutoClickerCost(autoClickerCost * 2);
      setAutoClickers(autoClickers + 1);
    }
  };

  return (
    <div className="p-4">
      <canvas ref={canvasRef} width={800} height={600} />
      <CookieClickerControls
        cookies={cookies}
        autoClickers={autoClickers}
        autoClickerCost={autoClickerCost}
        onBuyAutoClicker={buyAutoClicker}
      />
    </div>
  );
};

export default CookieClickerCanvas;
