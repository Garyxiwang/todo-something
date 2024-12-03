### WEB3 START

### 20241203
1. 启动网络：使用hardhat本地模拟线上网络环境 
```bash
pnpm hardhat node
```
2. 测试合约：通过 npx hardhat test 执行测试用例。
```bash 
pnpm hardhat test
```
3. 部署合约：通过部署脚本，将合约部署到本地网络。
```bash
# hardhat run [部署本地] 合约部署成功后记录地址和 ABI（放在artifacts目录下）
pnpm hardhat run [部署脚本] --network localhost 
```
4. 确保你正确启动了本地网络（如通过 npx hardhat node），并在 hardhat.config.js 中配置了网络
```javascript
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  solidity: "0.8.27",
};
```