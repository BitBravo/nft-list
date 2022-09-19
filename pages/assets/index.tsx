import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { getUserNfts } from "../../services/alchemy";

import { OwnedNft } from "../../types/NFT";
import InfiniteScroll from "react-infinite-scroll-component";
import { NftCard } from "../../components/NftCard";

export default function Assets() {
  const { address = "" } = useAccount();
  const router = useRouter();
  const [list, setList] = useState<OwnedNft[]>([]);
  const [token, setHasMore] = useState("");

  const getMore = useCallback(async () => {
    const response = await fetch(`/api/nfts/${address}?token=${token}`);
    const { ownedNfts: newNfts, pageKey = "" } = await response.json();
    if (pageKey !== token || !list.length) {
      setHasMore(pageKey);
      const uniqueList = [...list, ...newNfts].reduce((a: any[], nft: any) => {
        if (!a.find((el: any) => el.contract.address === nft.contract.address && el.id.tokenId === nft.id.tokenId)) {
          a.push(nft);
        }
        return a;
      }, []);
      setList(uniqueList);
    }
  }, [address, list, token]);

  useEffect(() => {
    if (!address) {
      router.push("/");
    } else {
      getMore();
    }
  }, [address, getMore, router]);

  return (
    <Box>
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
    </Box>
  );
}
