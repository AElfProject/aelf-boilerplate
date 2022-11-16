export const breakpointMap = {
  xs: 370,
  md: 580,
  xl: 942,
  xxl: 1160,
};

export const media = {
  xs: `(max-width: ${breakpointMap.xs}px)`,
  md: `(max-width: ${breakpointMap.md}px)`,
  xl: `(max-width: ${breakpointMap.xl}px)`,
  xxl: `(max-width: ${breakpointMap.xxl}px)`,
};

export const mediaQueries = {
  xs: `@media screen and ${media.xs}`,
  md: `@media screen and ${media.md}`,
  xl: `@media screen and ${media.xl}`,
  xxl: `@media screen and ${media.xxl}`,
};
