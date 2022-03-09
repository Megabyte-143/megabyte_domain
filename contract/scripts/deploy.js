const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("megabyte");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    let txn = await domainContract.register("yash", { value: hre.ethers.utils.parseEther('0.01') });
    await txn.wait();
    console.log("Minted domain yash.megabyte");

    txn = await domainContract.setLink("yash", "https://twitter.com/yash___garg");
    await txn.wait();
    console.log("Set record for yash.megabyte");

    const address = await domainContract.getAddress("yash");
    console.log("Owner of domain yash:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();