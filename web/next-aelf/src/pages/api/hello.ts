// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  name: string;
};
/**
 * Generate a handler.
 * @param req request of api
 * @param res response of api return
 * @returns Alway return data { name: 'hello' } and status 200.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'hello' });
}
