// CookieClickerCanvas.tsx
import React, { useRef } from 'react';
import { useCookieClicker } from '@/hooks/useCookieClicker';

const CookieClickerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCookieCount, setFloatingTexts, setZoom } = useCookieClicker(canvasRef);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CookieClickerCanvas;
