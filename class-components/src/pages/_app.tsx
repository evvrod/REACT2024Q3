/* eslint react/jsx-props-no-spreading: "off" */

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { setupStore } from '../store/store';

import '../globals.css';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
