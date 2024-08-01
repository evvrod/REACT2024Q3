import type { Metadata } from 'next';

import ThemeProvider from '../components/ThemeProvider';
import StoreProvider from '../components/StoreProvider';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Star Wars Search',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <StoreProvider>
            <div id="root">{children}</div>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
