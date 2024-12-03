const hre = require("hardhat");

async function main() {
  // 获取合约工厂
  const TodoList = await hre.ethers.getContractFactory("TodoList");

  // 部署合约
  const todoList = await TodoList.deploy();

  // 等待部署完成
  await todoList.waitForDeployment();

  // 获取合约地址
  console.log(`TodoList deployed to: ${todoList.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});