import { TelegramAppContextProvider } from '@/contexts/telegram-app-context';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TelegramAppContextProvider>
      <Component {...pageProps} />
    </TelegramAppContextProvider>
  );
}
