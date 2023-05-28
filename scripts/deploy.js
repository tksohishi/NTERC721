const ethers = require("ethers");
const artifact = require("../artifacts/contracts/NTERC721.sol/NonTransferrableERC721.json");
require("dotenv").config();
const { program, Option } = require("commander");
const hre = require("hardhat");

async function deploy(name, symbol, merkleRoot, baseURI, mintPrice, network) {
    let networkConfig = network ? hre.config.networks[network] : undefined;
    if (networkConfig) {
        console.log(`Deploying a contract on "${network}`);
    } else {
        networkConfig = hre.config.networks[hre.config.defaultNetwork];
        console.log(
            `Deploying a contract on the default network, ${hre.config.defaultNetwork}`
        );
    }

    const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
    const signer = new ethers.Wallet(networkConfig.accounts[0], provider);
    const factory = new ethers.ContractFactory(
        artifact.abi,
        artifact.bytecode,
        signer
    );

    const contract = await factory.deploy(
        name,
        symbol,
        merkleRoot,
        baseURI,
        ethers.utils.parseEther(mintPrice)
    );
    console.log("tx hash:", contract.deployTransaction.hash);
    await contract.deployed();
    console.log("Contract deployment completed");
}

program
    .requiredOption("-n --name <string>", "name of token")
    .requiredOption("-s --symbol <string>", "symbol of token")
    .requiredOption(
        "-r --merkleRoot <string>",
        "Merkle root to verify a tx's sender"
    )
    .requiredOption("-u --baseUri <string>", "Token's base URI")
    .requiredOption("-p --mintPrice <string>", "Mint price (in ETH)")
    .option("-nw --network <string>", "Network")
    .parse();
const options = program.opts();

deploy(
    options.name,
    options.symbol,
    options.merkleRoot,
    options.baseUri,
    options.mintPrice,
    options.network
).catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
