import Head from 'next/head';
import React from 'react';

export default function PageHead({ title, description }: { title: string; description?: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="viewport"
        content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;"
      />
      <meta name="description" content={description || title} />
    </Head>
  );
}
