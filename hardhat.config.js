require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: '0.8.18',
        settings: {
            optimizer: {
                enabled: true,
                runs: 300,
            },
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
            url:
                process.env.MUMBAI_RPC_URL ??
                'https://rpc.ankr.com/polygon_mumbai',
            accounts: [privateKey],
        },
        arbitrumOne: {
            url: process.env.ARBITRUM_RPC_URL ?? 'https://arb1.arbitrum.io/rpc',
            accounts: [privateKey],
        },
        arbitrumGoerli: {
            url:
                process.env.ARBITRUM_GOERLI_RPC_URL ??
                'https://goerli-rollup.arbitrum.io/rpc',
            accounts: [privateKey],
        },
        optimisticEthereum: {
            url: 'https://optimism.publicnode.com',
            accounts: [privateKey],
        },
        optimisticGoerli: {
            url: 'https://optimism-goerli.publicnode.com',
            accounts: [privateKey],
        },
        baseMainnet: {
            url: 'https://developer-access-mainnet.base.org',
            accounts: [privateKey],
        },
        baseGoerli: {
            url: 'https://goerli.base.org',
            accounts: [privateKey],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY,
            polygon: process.env.POLYGONSCAN_API_KEY,
            polygonMumbai: process.env.POLYGONSCAN_API_KEY,
            arbitrumGoerli: process.env.ARBISCAN_API_KEY,
            arbitrumOne: process.env.ARBISCAN_API_KEY,
            optimisticEthereum: process.env.OPTIMISM_EXPLORER_API_KEY,
            optimisticGoerli: process.env.OPTIMISM_EXPLORER_API_KEY,
            //baseMainnet: process.env.BASESCAN_API_KEY,
            // Basescan doesn't require an API key for the Base Goerlie, however
            // Hardhat still expects an arbitrary string to be provided.
            //baseGoerli: 'PLACEHOLDER_STRING',
        },
        customChains: [
            {
                network: 'baseGoerli',
                chainId: 84531,
                urls: {
                    apiURL: 'https://api-goerli.basescan.org/api',
                    browserURL: 'https://goerli.basescan.org/',
                },
            },
        ],
    },
};
