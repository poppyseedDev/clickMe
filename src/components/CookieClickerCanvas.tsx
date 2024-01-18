// CookieClickerCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useCookieClicker } from '@/hooks/useCookieClicker';
import useAutoClickers from '@/hooks/useAutoClicker';
import useLocalStorage from '@/hooks/useLocalStorage';
import CookieClickerControls from '@/components/CookieClickerControls';
import { AUTO_CLICKER_COST } from '@/constants/clickers';

const CookieClickerCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isClient, setIsClient] = useState(false); // New state to control rendering
    const [cookies, setCookies] = useLocalStorage('cookies', 0) || 0;
    const [autoClickers, setAutoClickers] = useLocalStorage('autoClickers', 0) || 0; 
    const [clickPower, setClickPower] = useLocalStorage('clickPower', 1) || 1; 
    const [cookiesPerClick, setCookiesPerClick] = useState<number>(1);

    function incrementCookies(amount: number) {
        setCookies(cookies + amount);
    }

    const { setFloatingTexts, setZoom } = useCookieClicker(canvasRef, cookies, autoClickers, () => incrementCookies(cookiesPerClick));

    const buyAutoClicker = () => {
        if (cookies >= AUTO_CLICKER_COST * (autoClickers + 1)) {
        setCookies(cookies - AUTO_CLICKER_COST * autoClickers);
        setAutoClickers(autoClickers + 1);
        }
    };

      // Set isClient to true after component mounts
      useEffect(() => {
        setIsClient(true);
    }, []);

      // Render the component only after client-side hydration
    if (!isClient) {
        return null;
    }

  return (
    <div className="p-4">
      <canvas ref={canvasRef} width={800} height={600} />
      <CookieClickerControls
        cookies={cookies}
        autoClickers={autoClickers}
        clickPower={clickPower}
        onBuyAutoClicker={buyAutoClicker}
      />
    </div>
  );
};

export default CookieClickerCanvas;
