import { useMemo } from "react";
import NextLink from "next/link";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Link,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem
} from "@chakra-ui/react";
import { getNftDetail, getOwnerForToken } from "../../../services/alchemy";
import { Nft } from "../../../types/NFT";

type NftDetailProps = {
  contractAddress: string;
  nftId: string;
  data: Nft;
};

export default function NftDetail(props: NftDetailProps) {
  const nft = useMemo(() => {
    const {
      contractAddress,
      nftId,
      data: { title, description, metadata, owners }
    } = props;
    const ownerAddress = owners?.length ? owners[0] : "";
    return {
      collection: title,
      contractAddress,
      name: `${title} #${nftId}`,
      description,
      imageUrl: metadata.image?.replaceAll("#", "%23"),
      attributes: metadata.attributes,
      owner: ownerAddress,
      user: ownerAddress ? ownerAddress.slice(0, 8) + "..." : ""
    };
  }, [props]);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 20 }}>
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={nft.imageUrl}
            fit={"cover"}
            align={"center"}
            position="sticky"
            top={40}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Box as={"header"}>
            <NextLink href={`/assets/${nft.contractAddress}`}>
              <Link as="a" color="blue.400">
                {nft.collection}
              </Link>
            </NextLink>
            <Heading lineHeight={1.1} fontWeight={600} fontSize="3xl" mb="2">
              {nft.name}
            </Heading>
            {nft.owner && (
              <Box as="a" color="blue.400" href={`https://opensea.io/${nft.owner}`}>
                Owned By {nft.user}
              </Box>
            )}
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              {nft.description}
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Nft Details
              </Text>

              <List spacing={2}>
                {nft.attributes?.map(({ trait_type, value }, key) => (
                  <ListItem key={key}>
                    <Text as={"span"} fontWeight={"bold"} textTransform="capitalize">
                      {trait_type}:
                    </Text>{" "}
                    {value}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export async function getServerSideProps(context: any) {
  const { contractAddress, nftId } = context.params;
  const nftPromise = await getNftDetail(contractAddress, nftId);
  const ownerPromise = await getOwnerForToken(contractAddress, nftId);
  const data = await Promise.all([nftPromise, ownerPromise]).then(([nft, owners]) => ({ ...nft, ...owners }));
  return {
    props: { data, contractAddress, nftId }
  };
}
