import type { NextApiRequest, NextApiResponse } from 'next';

import type { AllowedMethods } from '@/types/allowedMethods';

import { routeHandler } from '@/server/handlers/router-handler';

import telegramService from '@/server/services/telegram-service';

const allowedMethods: AllowedMethods = {
  async POST(req, res) {
    const isValid = telegramService.validateInitData(req.body.data);

    res.status(200).json({ isValid });
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => routeHandler(allowedMethods, req, res);
