// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNftDetail, getOwnerForToken } from "../../services/alchemy";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { contractAddress, tokenId } = req.query;
    const nftPromise = await getNftDetail(contractAddress as string, tokenId as string);
    const ownerPromise = await getOwnerForToken(contractAddress as string, tokenId as string);
    const [nft, owners] = await Promise.all([nftPromise, ownerPromise]);
    res.status(200).json({ ...nft, ...owners });
}
