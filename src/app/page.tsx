'use client';

import CookieClicker from '../components/CookieClicker';

const Home: React.FC = () => {
  return (
  <div className="p-4 max-w-sm mx-auto mt-20 bg-white rounded-xl shadow-md flex items-center justify-center space-x-4">
    <div>
      <div className="text-xl font-medium text-black">Cookie clicker</div>
      <CookieClicker />
    </div>
  </div>

  );
};

export default Home;
