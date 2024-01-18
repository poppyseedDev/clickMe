// useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: number): [number, (value: number) => void] {
  const [storedValue, setStoredValue] = useState<number>(() => {
    if (typeof window === 'undefined') {
      return initialValue; // Return initial value if not running in browser
    }
    try {
      const item = window.localStorage.getItem(key);
      const numberValue = Number(item);
      return isNaN(numberValue) ? initialValue : numberValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: number) => {
    if (typeof window !== 'undefined') {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, value.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
