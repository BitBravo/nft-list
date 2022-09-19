import NavLink from "next/link";
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
  Container,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect, useEnsName, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function HeaderMenu() {
  const { address = "", isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector()
  });

  return (
    <Box
      zIndex="1"
      position="sticky"
      top="0"
      bg={useColorModeValue("white", "gray.800")}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Container px={6} py={6} maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <NavLink href="/">
              <Heading mr={6} size="md">
                NFT MARKETPLACE
              </Heading>
            </NavLink>
          </Flex>

          <HStack>
            <Link py={3} px={4} href={"/"} fontSize={"md"} fontWeight={700}>
              Collections
            </Link>

            {isConnected && (
              <Link py={3} px={4} href={"/assets"} fontSize={"md"} fontWeight={700}>
                My Assets
              </Link>
            )}
            <Menu>
              <MenuButton as={Button} colorScheme="green">
                {isConnected ? `Connected to ${ensName ?? address?.slice(0, 6)}...` : "Connect Wallet"}
              </MenuButton>
              <MenuList>
                {isConnected && (
                  <>
                    <UserBalance address={address} />
                    <MenuDivider />
                    <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
                  </>
                )}
                {!isConnected &&
                  connectors?.map(connector => (
                    <MenuItem disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
                      {connector.name}
                      {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Container>
      <hr />
    </Box>
  );
}

const UserBalance: React.FC<{ address: string }> = ({ address }) => {
  const { data, isError, isLoading } = useBalance({
    addressOrName: address
  });

  if (isLoading) return <div>Loading …</div>;
  if (isError) return <div>Error</div>;
  return (
    <Text p={2} px={3}>
      Balance: {data?.formatted.slice(0, 5)} {data?.symbol}
    </Text>
  );
};
