// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("useLocalStorage get error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("useLocalStorage set error:", error);
    }
  }, [key, storedValue]);

  const setValue = useCallback((value) => {
    setStoredValue((prev) => (typeof value === "function" ? value(prev) : value));
  }, []);

  return [storedValue, setValue];
}
