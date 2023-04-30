const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NTERC721 Test", function () {
    let Contract, contract, owner, addr1, addr2;
    const merkleRoot =
        "0x2b6c5728b75c3f5862a7e18129a3fd7a9808b0fcbe51599e90f52b110c918736";
    const proofForOwner = [
        "0x457aa17fe0228467c8ff03c94ef937caf43d83d6102043300dc6a2e9a13a7006",
        "0x956c29270743256716ac81b12ec6b311915938037d99a40a5651ca317b41cfa6",
    ];
    const proofForAddr1 = [
        "0x147e22f5b794bc2c3e7b3bc0858a287907c0fa45b33843359d74a03a8317393e",
    ];

    beforeEach(async () => {
        Contract = await ethers.getContractFactory("NonTransferrableERC721");
        [owner, addr1, addr2] = await ethers.getSigners();

        contract = await Contract.deploy(
            "Non-transferrable NFT",
            "NTERC721",
            merkleRoot,
            "ipfs://example.com/token/"
        );
        await contract.deployed();

        // mint a token to the owner
        await contract.connect(owner).mint(proofForOwner, {
            value: ethers.utils.parseEther("0.1"),
        });

        expect(await contract.ownerOf(1)).to.equal(owner.address);
    });

    describe("mint function", () => {
        it("should not mint another token to the owner", async () => {
            await expect(
                contract.connect(owner).mint(proofForOwner, {
                    value: ethers.utils.parseEther("0.1"),
                })
            ).to.be.rejectedWith("Only one token is allowed");
        });

        it("should not mint a token without merkle proof", async () => {
            await expect(
                contract
                    .connect(addr1)
                    .mint([], { value: ethers.utils.parseEther("0.1") })
            ).to.be.revertedWith("Not a valid minter");
        });

        it("should not mint a token without enough payment", async () => {
            await expect(
                contract.connect(addr1).mint(proofForAddr1, {
                    value: ethers.utils.parseEther("0.01"),
                })
            ).to.be.revertedWith("Insufficient payment for minting");
        });
    });

    describe("mintByOwner function", () => {
        it("should mint a token to an address", async () => {
            await contract.connect(owner).mintByOwner(addr1.address);
            expect(await contract.ownerOf(2)).to.equal(addr1.address);
        });

        it("should not mint a token to an address if it's not by the owner", async () => {
            await expect(
                contract.connect(addr1).mintByOwner(addr1.address)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("burn function", () => {
        it("should burn a token if it's the contract owner", async () => {
            await contract.mintByOwner(addr1.address);
            await expect(contract.burn(2)).to.emit(contract, "Transfer");
            expect(await contract.balanceOf(addr1.address)).to.equal(0);
        });

        it("should burn a token if it's the token owner", async () => {
            await contract.mintByOwner(addr1.address);
            await expect(contract.connect(addr1).burn(2)).to.emit(contract, "Transfer");
            expect(await contract.balanceOf(addr1.address)).to.equal(0);
        });

        it("should not burn a token that you don't own if it's not by the owner", async () => {
            await contract.mintByOwner(addr1.address);
            await expect(contract.connect(addr1).burn(1)).to.be.revertedWith(
                "Only contract owner or token owner can burn the token"
            );
        });
    });

    describe("setMerkleRoot function", () => {
        const anotherMerkleRoot = "0x2b6c5728b75c3f5862a7e18129a3fd7a9808b0fcbe51599e90f52b110c918700";

        it("should set a merkle root if it's the contract owner", async () => {
            await contract.setMerkleRoot(anotherMerkleRoot);
        });

        it("should not set a merkle root if it's not the contract owner", async () => {
            await expect(
                contract.connect(addr1).setMerkleRoot(anotherMerkleRoot)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("setBaseUri function", () => {
        const anotherBaseUri = "https://example.com/metadata/";

        it("should set a base URI if it's the contract owner", async () => {
            await contract.setBaseURI(anotherBaseUri);
            expect(await contract.tokenURI(1)).to.equal("https://example.com/metadata/1.json");
        });

        it("should not set a base URI if it's the contract owner", async () => {
            await expect(
                contract.connect(addr1).setBaseURI(anotherBaseUri)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

});
