import { Box, Text, Flex, useColorModeValue, Heading } from "@chakra-ui/react";


export default function Footer() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8
          }}
        >
          <Heading size="md">NFT MARKETPLACE</Heading>
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2020. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
