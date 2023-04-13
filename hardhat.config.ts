import { task, HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';

import deployer from './.secret';

// const BSC_RPC = 'https://bsc-dataseed.binance.org/';
const eth_main = 'https://eth.llamarpc.com';

const config: HardhatUserConfig = {
  solidity: { version: '0.8.10' },
  networks: {
    eth: {
      url: eth_main,
      chainId: 1,
      accounts: [deployer.private],
    },
  },
  mocha: {
    timeout: 40000,
  },
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = config;
