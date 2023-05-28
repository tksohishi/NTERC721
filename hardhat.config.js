require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

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
            sepolia: process.env.ETHERSCAN_API_KEY,
            polygon: process.env.POLYGONSCAN_API_KEY,
            polygonMumbai: process.env.POLYGONSCAN_API_KEY,
            arbitrumGoerli: process.env.ARBISCAN_API_KEY,
            arbitrumOne: process.env.ARBISCAN_API_KEY,
        },
    },
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL ?? 'https://rpc2.sepolia.org',
            accounts: [privateKey],
        },
        polygon: {
            url: process.env.POLYGON_RPC_URL ?? 'https://polygon-rpc.com',
            accounts: [privateKey],
        },
        polygonMumbai: {
            url: process.env.MUMBAI_RPC_URL ?? 'https://rpc.ankr.com/polygon_mumbai',
            accounts: [privateKey],
        },
        arbitrumOne: {
            url: process.env.ARBITRUM_RPC_URL ?? 'https://arb1.arbitrum.io/rpc',
            accounts: [privateKey],
        },
        arbitrumGoerli: {
            url: process.env.ARBITRUM_GOERLI_RPC_URL ?? 'https://goerli-rollup.arbitrum.io/rpc',
            accounts: [privateKey],
        },
    },
};
