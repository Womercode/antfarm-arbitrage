import { ethers, run } from 'hardhat';

import deployer from '../.secret';

// WBNB address on BSC, WETH address on ETH
const WethAddr = '0x79dF3C5C1EAD89497F4871FB3b9109A80aBB17B6';

async function main() {
  await run('compile');
  const FlashBot = await ethers.getContractFactory('FlashBot');
  const flashBot = await FlashBot.deploy(WethAddr);
  console.log(FlashBot);
  console.log(`FlashBot deployed to ${flashBot.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
