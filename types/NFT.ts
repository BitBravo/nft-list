export declare enum NftTokenType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155",
    UNKNOWN = "UNKNOWN"
}

export interface NftMetadata extends Record<string, any> {
    name?: string;
    description?: string;
    image?: string;
    external_url?: string;
    background_color?: string;
    attributes?: Array<Record<string, any>>;
}

export interface BaseTokenMetadata {
    tokenId: string;
    tokenMetadata?: any;
}

export interface BaseNftContract {
    address: string;
}

export interface BaseNft {
    contract: BaseNftContract;
    tokenId: string;
    tokenType: NftTokenType;
}

export interface Nft extends BaseNft {
    id: BaseTokenMetadata;
    title: string;
    description: string;
    timeLastUpdated: string;
    metadataError: string | undefined;
    rawMetadata: any;
    tokenUri: string | undefined;
    media: any[];
    metadata: NftMetadata,
    owners?: string[]
}

export interface OwnedNft extends Nft {
    readonly balance: number;
}

export interface NftContract extends BaseNftContract {
    tokenType: NftTokenType;
    name?: string;
    symbol?: string;
    totalSupply?: number;
}

export interface OwnedNftsResponse {
    readonly ownedNfts: OwnedNft[];
    readonly pageKey?: string;
    readonly totalCount: number;
}

export type NftsApiPayload = {
    nfts: Nft[];
    nextToken?: string;
}