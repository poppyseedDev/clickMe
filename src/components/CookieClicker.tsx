import React, { useState } from 'react';

const CookieClicker: React.FC = () => {
  const [cookies, setCookies] = useState(0);

  const handleClick = () => {
    setCookies(cookies + 1);
  };

  return (
    <div className="p-4">
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me!
      </button>
      <p>You have {cookies} cookies</p>
    </div>
  );
};

export default CookieClicker;
