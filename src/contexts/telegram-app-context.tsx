import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type User = {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
};

type TelegramAppContextData = {
  user: User;
};

const TelegramAppContext = createContext({} as TelegramAppContextData);

type TelegramAppContextProviderProps = {
  children: ReactNode;
};

export function TelegramAppContextProvider({ children }: TelegramAppContextProviderProps) {
  const [webApp, setWebApp] = useState<any>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!(window as any).Telegram) return;

    const webApp = (window as any).Telegram.WebApp;
    setWebApp(webApp);
    webApp.ready();
  }, []);

  useEffect(() => {
    if (!webApp) return;

    axios
      .post('/api/telegram/validate-data', { data: webApp.initData })
      .then((response) => {
        const { data } = response;

        if (data.isValid) setUser(webApp.initDataUnsafe.user);
      })
      .catch((error) => console.log('Failed to validate data', { error }));
  }, [webApp]);

  const contextValue: TelegramAppContextData = {
    user,
  };

  return <TelegramAppContext.Provider value={contextValue}>{children}</TelegramAppContext.Provider>;
}

export const useTelegramApp = () => {
  return useContext(TelegramAppContext);
};
