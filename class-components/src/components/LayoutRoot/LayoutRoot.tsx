import ThemeProvider from '@components/ThemeProvider';
import StoreProvider from '@components/StoreProvider';

interface ILayoutProps {
  children: React.ReactNode;
}
export default function LyoutRoot({ children }: ILayoutProps) {
  return (
    <StoreProvider>
      <ThemeProvider>{children} </ThemeProvider>
    </StoreProvider>
  );
}
