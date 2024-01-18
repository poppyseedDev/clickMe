'use client';

import CookieClicker from '../components/CookieClicker';

const Home: React.FC = () => {
  return (
  <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div>
      <div className="text-xl font-medium text-black">ChitChat</div>
      <CookieClicker />
    </div>
  </div>

  );
};

export default Home;
