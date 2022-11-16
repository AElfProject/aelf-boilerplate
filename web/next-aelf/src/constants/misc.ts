import BigNumber from 'bignumber.js';

export const LANG_MAX = new BigNumber('9223372036854774784');

export const ZERO = new BigNumber(0);
export const ONE = new BigNumber(1);

export const isEffectiveNumber = (v: any) => {
  const val = new BigNumber(v);
  return !val.isNaN() && !val.lte(0);
};

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AppName';
export const prefixCls = process.env.NEXT_PUBLIC_CSS_APP_PREFIX;

export const MaxUint256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
