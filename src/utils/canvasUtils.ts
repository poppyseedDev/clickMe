// canvasUtils.ts
export const drawCookie = (ctx: CanvasRenderingContext2D, cookieImage: HTMLImageElement, zoom: number, canvasWidth: number, canvasHeight: number) => {
    const width = cookieImage.width * zoom;
    const height = cookieImage.height * zoom;
    ctx.drawImage(cookieImage, canvasWidth / 2 - width / 2, canvasHeight / 2 - height / 2, width, height);
  };
  
  export const drawCookieCount = (ctx: CanvasRenderingContext2D, cookieCount: number) => {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Bobas: ${cookieCount}`, 20, 40);
  };
  
  export const drawFloatingTexts = (ctx: CanvasRenderingContext2D, floatingTexts: FloatingText[]) => {
    floatingTexts.forEach((text) => {
      ctx.font = '20px Arial';
      ctx.fillStyle = `rgba(0, 0, 0, ${text.opacity})`;
      ctx.fillText('+1', text.x, text.y);
    });
  };
  