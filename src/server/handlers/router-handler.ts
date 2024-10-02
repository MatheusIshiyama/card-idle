import { NextApiRequest, NextApiResponse } from 'next';

import type { AllowedMethods } from '@/types/allowedMethods';

export async function routeHandler(allowedMethods: AllowedMethods, req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (!method) return res.status(500).json({ message: 'Internal server error' });

  const allowedMethod = allowedMethods[method];
  if (allowedMethod) return allowedMethod(req, res);

  res.setHeader('Allow', Object.keys(allowedMethods));
  res.status(405).end(`Method ${method} Not Allowed`);
}
