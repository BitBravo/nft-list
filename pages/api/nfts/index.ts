// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNftsForCollection } from "../../../services/alchemy";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { contractAddress, token, owner } = req.query;
    const data = await getNftsForCollection(contractAddress as string, token as string);
    res.status(200).json(data)
}
