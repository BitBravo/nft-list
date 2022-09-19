import Link from "next/link";
import { Image, Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import { CollectionType } from "../types/Collection";

type CollectionCardProps = {
  collection: CollectionType;
};

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Flex my={30} shadow="md" borderWidth="1px">
      <Box p="12">
        <Heading as="h2" size="3xl" mr={2}>
          {collection.name}
        </Heading>
        <Text fontSize={24} mt={8}>
          {collection.description}
        </Text>
        <Link href={`/assets/${collection.contractAddress}`}>
          <Button colorScheme="teal" size="lg" mt="8">
            View Collection
          </Button>
        </Link>
      </Box>

      <Image boxSize="450px" ml="10" src={collection.imageUrl} alt="" />
    </Flex>
  );
}

export default CollectionCard;
