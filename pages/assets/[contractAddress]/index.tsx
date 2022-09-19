import { Box } from "@chakra-ui/react";
import { getNftsForCollection } from "../../../services/alchemy";

import InfiniteView from "../../../components/InfiniteView";
import { NftsApiPayload } from "../../../types/NFT";

type AssetsProps = {
  contractAddress: string;
  data: NftsApiPayload;
};

export default function Assets({ data, contractAddress }: AssetsProps) {
  return (
    <Box>
      <InfiniteView contractAddress={contractAddress} nfts={data.nfts} nextToken={data?.nextToken} />
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  const { contractAddress } = context.params;
  const data = await getNftsForCollection(contractAddress);
  return {
    props: { data, contractAddress }
  };
}