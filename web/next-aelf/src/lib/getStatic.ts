import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../next-i18next.config';

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));
// `getStaticPaths` requires using `getStaticProps`.
// if you don't need pre-render or i18n just ignore `getStaticPaths` and `getStaticProps`.
export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});
export async function getI18nProps(ctx: GetStaticPropsContext, ns?: string[]) {
  const locale = ctx?.params?.locale as string;
  // ns default: ['common]
  const props = {
    ...(await serverSideTranslations(locale, ns)),
  };
  return props;
}
export function makeStaticProps(ns?: string[]) {
  // Next.js will pre-render this page at build time using the props returned by getStaticProps.
  return async function getStaticProps(ctx: GetStaticPropsContext) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
