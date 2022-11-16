import { DependencyList, useCallback, useRef } from 'react';

export default function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  delay = 500,
) {
  const lock = useRef<number>();
  return useCallback((...args: any[]) => {
    const now = new Date().getTime();
    if (lock.current && lock.current + delay > now) return;
    lock.current = now;
    return callback(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
