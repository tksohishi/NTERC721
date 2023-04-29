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
cp .env.sample .env
node scripts/deploy -n "Test" -s "TST" -r "0xeb1f4c79012257eb2cb7c533ed009a835d6359fd31963aab5da16c3210512275" -u "https://example.com/base"
```
