import { useMemo } from 'react';
import { isMobileDevices } from 'utils/isMobile';

export function useMobile() {
  return useMemo(() => isMobileDevices(), []);
}
