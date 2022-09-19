import { useMemo } from "react";
import { Box, Badge, Link, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Nft } from "../types/NFT";

type NftPayload = {
  data: Nft;
};

export function NftCard({ data }: NftPayload) {
  const { contractAddress, nftId, tokenType, name, description, imageUrl } = useMemo(() => {
    const {
      id,
      title,
      description,
      contract: { address },
      metadata
    } = data;
    const tokenId = parseInt(id?.tokenId) ?? "";
    const base64Img = metadata.image?.replaceAll("#", "%23");

    return {
      contractAddress: address,
      nftId: tokenId,
      tokenType: id.tokenMetadata?.tokenType,
      name: `${title} #${tokenId}`,
      description,
      imageUrl: base64Img
    };
  }, [data]);

  return (
    <NextLink href={`/assets/${contractAddress}/${nftId}`} style={{ cursor: "pointer" }}>
      <Link>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Flex maxH={300} justifyContent="center">
            <img src={imageUrl} alt={"nft image"} height="300" width="300" />
          </Flex>
          <Box p="6" mt="2">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                <Text fontWeight="bold" fontSize="sm">
                  {tokenType}
                </Text>
              </Badge>
            </Box>

            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
              <Text fontWeight="bold" fontSize="lg">
                {name}
              </Text>
            </Box>
            <Box>{description}</Box>
          </Box>
        </Box>
      </Link>
    </NextLink>
  );
}
