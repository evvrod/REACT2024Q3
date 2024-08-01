'use client';

import { ThemeProvider } from '../context/ThemeContext';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
