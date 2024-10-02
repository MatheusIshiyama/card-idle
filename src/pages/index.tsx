import { useTelegramApp } from '@/contexts/telegram-app-context';

export default function Page() {
  const { user } = useTelegramApp();

  return (
    <div>
      Hello world!
      {user &&
        Object.keys(user).map((userKey, index) => (
          <p key={index}>
            {userKey}: {user[userKey]}
          </p>
        ))}
    </div>
  );
}
