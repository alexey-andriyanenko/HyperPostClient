import { useEffect, useRef } from "react";

export interface IUseDebounce {
  (delay: number): (callback: VoidFunction) => void;
}

export const useDebounce: IUseDebounce = (delay) => {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => resetDebounce();
  }, []);

  const resetDebounce = () => {
    clearTimeout(timerRef.current);
  };

  return (callback: VoidFunction) => {
    resetDebounce();
    timerRef.current = setTimeout(callback, delay);
  };
};
