import type { NextPage } from "next";
import CollectionList from "../components/CollectionList";

const collections = [
  {
    name: "CryptoPunk",
    description:
      "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
    contractAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    imageUrl:
      "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format"
  }
];

const Home: NextPage = () => {
  return <CollectionList collections={collections} />;
};

export default Home;
