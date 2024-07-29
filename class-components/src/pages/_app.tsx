/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';
import type { AppProps } from 'next/app';

import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return getLayout(<Component {...pageProps} />, pageProps);
}
