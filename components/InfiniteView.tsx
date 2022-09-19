import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SimpleGrid, Spinner, Flex } from "@chakra-ui/react";
import { NftsApiPayload } from "../types/NFT";
import { NftCard } from "./NftCard";

interface InfiniteViewPayload extends NftsApiPayload {
  contractAddress: string;
}

export default function InfiniteView({ nfts, nextToken, contractAddress }: InfiniteViewPayload) {
  const [list, setList] = useState(nfts);
  const [token, setHasMore] = useState(nextToken);

  const getMore = async () => {
    const response = await fetch(`/api/nfts?contractAddress=${contractAddress}&token=${token}`);
    const { nfts: newNfts, nextToken: newToken } = await response.json();
    setHasMore(newToken);
    setList(items => [...items, ...newNfts]);
  };

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={getMore}
      hasMore={!!token}
      loader={
        <Flex justifyContent="center" my="10">
          <Spinner color="red.500" />
        </Flex>
      }
      endMessage={<h4>Nothing more to show</h4>}
    >
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {list.map((nft, key) => (
          <NftCard data={nft} key={key} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
}
