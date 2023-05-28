# Non-transferrable ERC-721

An implementation of the ERC-721 tokens that are not transferrable by their token owners

# Setup

```shell
npm install
npx hardhat compile
```

# Test

```shell
npx hardhat test
```

# Deploy

Prepare required configurations to be set in `.env` file.

```shell
npx hardhat compile --force
node scripts/deploy -n "Test" -s "TST" -r "0xeb1f4c79012257eb2cb7c533ed009a835d6359fd31963aab5da16c3210512275" -u "https://example.com/base/" -p "0.01" -nw "polygonMumbai"
```

# Verify

```shell
npx hardhat verify --network "polygonMumbai" DEPLOYED_CONTRACT_ADDRESS "Test" "TST" "0xeb1f4c79012257eb2cb7c533ed009a835d6359fd31963aab5da16c3210512275" "https://example.com/base/" 10000000000000000
```
