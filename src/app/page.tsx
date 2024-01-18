'use client';

import CookieClickerCanvas from '@/components/CookieClickerCanvas';
import CookieClicker from '../components/CookieClicker';

const Home: React.FC = () => {
  return (
  <div className="p-4 max-w-sm mx-auto mt-20 flex items-center justify-center space-x-4">
    <div>
      <CookieClickerCanvas />
      </div>
  </div>

  );
};

export default Home;
