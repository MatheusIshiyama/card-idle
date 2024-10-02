import crypto from 'crypto';

function validateData(dataToCheck: string, hash: string): boolean {
  const botToken = process.env.BOT_TOKEN;

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();

  const result = crypto.createHmac('sha256', secretKey).update(dataToCheck).digest('hex');

  return result === hash;
}

class TelegramService {
  validateInitData(data: string) {
    const initData = new URLSearchParams(data);

    initData.sort();

    const hash = initData.get('hash');
    initData.delete('hash');

    const dataToCheck = [...(initData.entries() as any)].map(([key, value]) => key + '=' + value).join('\n');

    const isValid = validateData(dataToCheck, hash);

    return isValid;
  }
}

export default new TelegramService();
