// useCookieClicker.ts
import { useState, useEffect, useCallback } from 'react';
import { drawCookie, drawCookieCount, drawFloatingTexts } from '@/utils/canvasUtils';
import { FloatingText } from '@/types';

export const useCookieClicker = (
  canvasRef: React.RefObject<HTMLCanvasElement>, 
  cookies: number, 
  autoClickers: number, 
  onCookieClick: () => void
) => {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [zoom, setZoom] = useState(1);

  const updateFloatingTexts = useCallback(() => {
    setFloatingTexts((texts) => texts.map((text) => ({
      ...text,
      y: text.y - 1,
      opacity: text.opacity - 0.01
    })).filter(text => text.opacity > 0));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let cookieImage = new Image();
    cookieImage.src = '/test.png'; // Replace with your image path
    cookieImage.onload = () => {
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCookie(ctx, cookieImage, zoom, canvas.width, canvas.height);
      drawCookieCount(ctx, cookies);
      drawFloatingTexts(ctx, floatingTexts, autoClickers);
      updateFloatingTexts(); 
      requestAnimationFrame(draw);
    };

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x > canvas.width / 2 - cookieImage.width * zoom / 2 && x < canvas.width / 2 + cookieImage.width * zoom / 2 &&
          y > canvas.height / 2 - cookieImage.height * zoom / 2 && y < canvas.height / 2 + cookieImage.height * zoom / 2) {
        onCookieClick();
        setFloatingTexts((texts) => [
          ...texts,
          { x: x, y: y, opacity: 1 },
        ]);

        setZoom(1.1);
        setTimeout(() => setZoom(1), 100);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [cookies, autoClickers, zoom, updateFloatingTexts, onCookieClick]);

  return { setFloatingTexts, setZoom };
};
