import { NextApiRequest, NextApiResponse } from 'next';

export type AllowedMethods = {
  GET?: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any;
  HEAD?: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any;
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any;
  PUT?: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any;
  DELETE?: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any;
  PATCH?: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any;
};
