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
            sepolia: process.env.ETHERSCAN_API_KEY,
            polygon: process.env.POLYGONSCAN_API_KEY,
            polygonMumbai: process.env.POLYGONSCAN_API_KEY,
            arbitrumGoerli: process.env.ARBISCAN_API_KEY,
            arbitrumOne: process.env.ARBISCAN_API_KEY,
        },
    },
    defaultNetwork: 'sepolia',
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL ?? 'https://rpc2.sepolia.org',
            accounts: [process.env.PRIVATE_KEY],
        },
        polygon: {
            url: process.env.POLYGON_RPC_URL ?? 'https://polygon-rpc.com',
            accounts: [process.env.PRIVATE_KEY],
        },
        polygonMumbai: {
            url: process.env.MUMBAI_RPC_URL ?? 'https://rpc.ankr.com/polygon_mumbai',
            accounts: [process.env.PRIVATE_KEY],
        },
        arbitrumOne: {
            url: process.env.ARBITRUM_RPC_URL ?? 'https://arb1.arbitrum.io/rpc',
            accounts: [process.env.PRIVATE_KEY],
        },
        arbitrumGoerli: {
            url: process.env.ARBITRUM_GOERLI_RPC_URL ?? 'https://goerli-rollup.arbitrum.io/rpc',
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
