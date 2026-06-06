import hre from "hardhat";

async function main() {
  const ResearchRegistry = await hre.ethers.getContractFactory(
    "ResearchRegistry"
  );

  const registry = await ResearchRegistry.deploy();

  await registry.waitForDeployment();

  console.log(
    "ResearchRegistry deployed to:",
    await registry.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});