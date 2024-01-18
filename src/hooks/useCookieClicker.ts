import { useState, useEffect, useCallback } from 'react';
import { drawCookie, drawCookieCount, drawFloatingTexts } from '@/utils/canvasUtils';
import { FloatingText } from '@/types';

export const useCookieClicker = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [cookieCount, setCookieCount] = useState(0);
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
      drawCookieCount(ctx, cookieCount);
      drawFloatingTexts(ctx, floatingTexts);
      updateFloatingTexts(); // Update floating texts positions and opacities
      requestAnimationFrame(draw);
    };

    const handleCanvasClick = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        if (x > canvas.width / 2 - cookieImage.width * zoom / 2 && x < canvas.width / 2 + cookieImage.width * zoom / 2 &&
            y > canvas.height / 2 - cookieImage.height * zoom / 2 && y < canvas.height / 2 + cookieImage.height * zoom / 2) {
          setCookieCount((prevCount) => prevCount + 1);
          setFloatingTexts((texts) => [
            ...texts,
            { x: x, y: y, opacity: 1 }, // Set the position to where the user clicks
          ]);
  
          // Trigger zoom effect
          setZoom(1.1);
          setTimeout(() => setZoom(1), 100); // Reset zoom after 100ms
        }
      };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [cookieCount, floatingTexts, zoom, updateFloatingTexts]);

  return { setCookieCount, setFloatingTexts, setZoom };
};
