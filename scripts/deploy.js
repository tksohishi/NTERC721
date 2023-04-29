const ethers = require("ethers");
const artifact = require("../artifacts/contracts/NTERC721.sol/NonTransferrableERC721.json");
require("dotenv").config();
const { program, Option } = require('commander');

async function main(name, symbol, merkleRoot, baseURI) {
    const privateKey = process.env.PRIVATE_KEY ?? "";
    if (privateKey === "") {
        throw new Error("PRIVATE_KEY should be set in .env");
    }
    const rpcUrl = process.env.MUMBAI_RPC_URL ?? "";
    if (rpcUrl === "") {
        throw new Error(
            "No value set for environement variable MUMBAI_RPC_URL"
        );
    }

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provider);
    const factory = new ethers.ContractFactory(
        artifact.abi,
        artifact.bytecode,
        signer
    );
    const contract = await factory.deploy(name, symbol, merkleRoot, baseURI);
    console.log("tx hash:", contract.deployTransaction.hash);
    await contract.deployed();
    console.log("Contract deployment completed");
}

program
    .addOption(
        new Option(
            "-n --name <string>",
            "name of token (e.g. bitcoin)"
        ).makeOptionMandatory()
    )
    .addOption(
        new Option(
            "-s --symbol <string>",
            "symbol of token (e.g. BTC)"
        ).makeOptionMandatory()
    )
    .addOption(
        new Option(
            "-r --merkleRoot <string>",
            "Merkle root to verify a tx's sender"
        ).makeOptionMandatory()
    )
    .addOption(
        new Option(
            "-u --baseUri <string>",
            "Token's base URI"
        ).makeOptionMandatory()
    )
    .parse();
const options = program.opts();

main(options.name, options.symbol, options.merkleRoot, options.baseUri).catch(
    (err) => {
        console.error(err);
        process.exitCode = 1;
    }
);
