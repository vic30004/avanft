import Web3Provider from "@components/web3";
import { Nav } from "../..";

export default function Base({ children }) {
  return (
    <Web3Provider>
      <Nav />
      {children}
    </Web3Provider>
  );
}
