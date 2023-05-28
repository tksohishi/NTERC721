require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 300,
            },
        },
    },
    etherscan: {
        apiKey: {
            polygon: process.env.POLYGONSCAN_API_KEY,
            polygonMumbai: process.env.POLYGONSCAN_API_KEY,
            arbitrumGoerli: process.env.ARBISCAN_API_KEY,
            arbitrumOne: process.env.ARBISCAN_API_KEY,
        },
    },
    networks: {
        polygon: {
            url: process.env.POLYGON_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
        polygonMumbai: {
            url: process.env.MUMBAI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
        arbitrumOne: {
            url: process.env.ARBITRUM_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
        arbitrumGoerli: {
            url: process.env.ARBITRUM_GOERLI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
