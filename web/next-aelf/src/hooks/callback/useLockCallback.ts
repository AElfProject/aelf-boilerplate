import { DependencyList, useCallback, useRef } from 'react';

// useLockCallback prevent concurrent execution
export default function useLockCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList) {
  const lock = useRef(false);
  return useCallback(async (...args: any) => {
    if (lock.current) return;
    lock.current = true;
    try {
      const req = await callback(...args);
      lock.current = false;
      return req;
    } catch (e) {
      lock.current = false;
      throw e;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
