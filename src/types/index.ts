export interface FloatingText {
    x: number;
    y: number;
    opacity: number;
  }

 export interface CookieClickerControlsProps {
    cookies: number;
    autoClickers: number;
    clickPower: number;
    onBuyAutoClicker: () => void;
  }