import React, { useRef, useEffect, useState } from 'react';

interface FloatingText {
  x: number;
  y: number;
  opacity: number;
}

const CookieClickerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cookieCount, setCookieCount] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [zoom, setZoom] = useState(1); // New state for zoom level

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let cookieImage = new Image();
    cookieImage.src = '/test.png'; // Replace with your image path
    cookieImage.onload = () => {
      draw();
    };

    const drawCookie = () => {
      // Adjust drawing to include zoom effect
      const width = cookieImage.width * zoom;
      const height = cookieImage.height * zoom;
      ctx.drawImage(cookieImage, canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height);
    };

    const drawCookieCount = () => {
      ctx.font = '24px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Bobas: ${cookieCount}`, 20, 40);
    };

    const drawFloatingTexts = () => {
      floatingTexts.forEach((text, index) => {
        ctx.font = '20px Arial';
        ctx.fillStyle = `rgba(0, 0, 0, ${text.opacity})`;
        ctx.fillText('+1', text.x, text.y);
        floatingTexts[index].y -= 1;
        floatingTexts[index].opacity -= 0.01;
      });

      setFloatingTexts(floatingTexts.filter(text => text.opacity > 0));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCookie();
      drawCookieCount();
      drawFloatingTexts();
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
  }, [cookieCount, floatingTexts, zoom]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CookieClickerCanvas;
