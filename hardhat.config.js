require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const keyData = fs.readFileSync("./p-key.txt", {
  encoding: "utf8",
  flag: "r",
});

const projectKeyData = fs.readFileSync("projectKey.txt", {
  encoding: "utf-8",
  flag: "r",
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337, //config standard
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectKeyData}`,
      accounts: [keyData],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectKeyData}`,
      accounts: [keyData],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
