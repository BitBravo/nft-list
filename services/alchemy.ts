import BaseApi from "./request";
import { BaseNft, NftContract, NftsApiPayload, OwnedNft, OwnedNftsResponse } from "../types/NFT";
export const alchemyApi = new BaseApi();


export function getUserNfts(owner: string, pageKey: string): Promise<OwnedNftsResponse> {
    return alchemyApi.callApi<any>({
        url: "getNFTs",
        params: {
            owner,
            withMetadata: true,
            pageSize: 15,
            pageKey
        }
    }).then((result) => result?.data)
}

export function getCollection(contractAddress: string): Promise<NftContract> {
    return alchemyApi.callApi<any>({
        url: "getContractMetadata",
        params: { contractAddress }
    }).then((result) => result?.data)
}

export async function getNftsForCollection(contractAddress: string, nextToken?: string): Promise<NftsApiPayload> {
    return alchemyApi.callApi<any>({
        url: "getNFTsForCollection",
        params: {
            withMetadata: true,
            contractAddress,
            startToken: nextToken,
            limit: 15
        }
    }).then((result) => result?.data)
}

export async function getNftDetail(contractAddress: string, nftId?: string): Promise<NftsApiPayload> {
    return alchemyApi.callApi<any>({
        url: "getNFTMetadata",
        params: {
            contractAddress,
            tokenId: nftId,
        }
    }).then((result) => result?.data)
}

export async function getOwnerForToken(contractAddress: string, nftId?: string): Promise<NftsApiPayload> {
    return alchemyApi.callApi<any>({
        url: "getOwnersForToken",
        params: {
            contractAddress,
            tokenId: nftId,
        }
    }).then((result) => result?.data)
}