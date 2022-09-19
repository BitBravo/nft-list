import {  Heading, Box } from "@chakra-ui/react";
import CollectionCard from "./CollectionCard";

type CategoryProductsSectionProps = {
  collections: any[];
};

function CollectionList({ collections }: CategoryProductsSectionProps) {
  return (
    <Box py="5">
      <Heading as="h4" size="md" mr={2}>
        Collections
      </Heading>
      {collections.map((collection, key) => (
        <CollectionCard collection={collection} key={key} />
      ))}
    </Box>
  );
}

export default CollectionList;
