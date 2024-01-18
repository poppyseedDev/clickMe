export interface FloatingText {
    x: number;
    y: number;
    opacity: number;
  }

 export interface CookieClickerControlsProps {
    cookies: number;
    autoClickers: number;
    autoClickerCost: number;
    onBuyAutoClicker: () => void;
  }