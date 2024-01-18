import React, { useRef, useEffect, useState } from 'react';

const CookieClickerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cookieCount, setCookieCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let cookieImage = new Image();
    cookieImage.src = '/test.png';
    cookieImage.onload = () => {
      drawCookie();
    };

    const drawCookie = () => {
      if (ctx && cookieImage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(cookieImage, canvas.width / 2 - cookieImage.width / 2, canvas.height / 2 - cookieImage.height / 2);
        drawCookieCount();
      }
    };

    const drawCookieCount = () => {
      ctx.font = '24px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Bobas: ${cookieCount}`, 20, 40);
    };

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x > canvas.width / 2 - cookieImage.width / 2 && x < canvas.width / 2 + cookieImage.width / 2 &&
          y > canvas.height / 2 - cookieImage.height / 2 && y < canvas.height / 2 + cookieImage.height / 2) {
        setCookieCount((prevCount) => prevCount + 1);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [cookieCount]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CookieClickerCanvas;
