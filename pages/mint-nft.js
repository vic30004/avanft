import Button from "@components/ui/button";
import Base from "@components/ui/base";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { getSigner } from "@components/web3";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import { nftaddress, nftmarketaddress } from "config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import AvanftMarket from "../artifacts/contracts/AvanftMarket.sol/AvanftMarket.json";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function MintNft() {
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState(null);
  const [assetsUrl, setAssetsUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: 0,
    name: "",
    description: "",
  });

  async function onChange(e, type) {
    const file = e.target.files[0];

    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      type === "picture" ? setFileUrl(url) : setAssetsUrl(url);
    } catch (error) {
      alert("Error uploading file: ", error);
    }
  }
  const createSale = async (url) => {
    const signer = await getSigner();
    console.log(signer);
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.mintToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(nftmarketaddress, AvanftMarket.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.makeMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
  };

  async function createMarket(e) {
    e.preventDefault();
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl || !assetsUrl) {
      alert(
        "Please make sure to provide a name, description, price, picture and assets"
      );
    }

    //upload to IPFS
    const data = JSON.stringify({
      name,
      description,
      price,
      image: fileUrl,
      assets: assetsUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      alert("Error Minting item:", error);
    }
  }

  return (
    <section className='pt-40'>
      <h1 className='text-center title-font text-6xl'>Mint NFT</h1>
      <form className='flex flex-col items-center pt-10'>
        <input
          className='w-2/12 px-3 py-4 border mb-10'
          type='text'
          placeholder='text'
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <input
          className='w-2/12 px-3 py-4 border mb-10'
          type='text'
          placeholder='Description'
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          className='w-2/12 px-3 py-4 border mb-10'
          type='text'
          placeholder='Price'
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <label>
          Upload Picture
          <input
            type='file'
            name='Picture'
            onChange={(e) => onChange(e, "picture")}
          />
        </label>
        <label>
          Upload Assets
          <input
            type='file'
            name='Asset'
            onChange={(e) => onChange(e, "asset")}
          />
        </label>

        <button
          className=' bg-purple-dark title-font px-7 py-3 rounded-lg text-sm my-4'
          onClick={createMarket}
        >
          Mint
        </button>
      </form>
    </section>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <MintNft {...props} />
  </Base>
);

export default Wrapper;
