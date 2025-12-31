const hre = require("hardhat")

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  // 1. Deploy ReliefStablecoin
  const ReliefStablecoin = await hre.ethers.getContractFactory("ReliefStablecoin")
  const token = await ReliefStablecoin.deploy()
  await token.waitForDeployment()
  const tokenAddress = await token.getAddress()
  console.log("ReliefStablecoin deployed to:", tokenAddress)

  // 2. Deploy ProgramManager
  const ProgramManager = await hre.ethers.getContractFactory("ProgramManager")
  const manager = await ProgramManager.deploy(tokenAddress)
  await manager.waitForDeployment()
  const managerAddress = await manager.getAddress()
  console.log("ProgramManager deployed to:", managerAddress)

  // 3. Setup permissions
  await token.setProgramManager(managerAddress)
  console.log("ProgramManager authorized in Stablecoin contract")

  // 4. Seed initial data (Demo Program)
  const startDate = Math.floor(Date.now() / 1000)
  const endDate = startDate + 30 * 24 * 60 * 60 // 30 days
  const budget = hre.ethers.parseEther("1000000") // 1M tokens
  const allocation = hre.ethers.parseEther("500") // 500 tokens per user

  await manager.createProgram("Odisha Cyclone Relief", "Cyclone", "Odisha", startDate, endDate, budget, allocation)
  console.log("Demo Relief Program initialized")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
