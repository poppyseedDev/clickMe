// useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: number): [number, (value: number) => void] {
  const [storedValue, setStoredValue] = useState<number>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? parseInt(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: number) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
