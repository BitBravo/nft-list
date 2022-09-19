// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNftsForCollection, getUserNfts } from "../../../services/alchemy";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { token, owner } = req.query;
    const data = await getUserNfts(owner as string, token as string);
    res.status(200).json(data)
}
