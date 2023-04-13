import { BigNumber, BigNumberish, utils } from 'ethers';

interface Config {
  contractAddr: string;
  logLevel: string;
  minimumProfit: number;
  gasPrice: BigNumber;
  gasLimit: BigNumberish;
  ethScanUrl: string;
  concurrency: number;
}

const contractAddr = 'CONTRACT_ADDRESS'; // flash bot contract address
const gasPrice = utils.parseUnits('0', 'gwei');
const gasLimit = 300000;

const ethScanApiKey = 'T1CU459JN258WHB5T9DYD7QXM496GZDEBG'; // ethscan API key
const ethScanUrl = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ethScanApiKey}`;

const config: Config = {
  contractAddr: contractAddr,
  logLevel: 'info',
  concurrency: 50,
  minimumProfit: 50, // in USD
  gasPrice: gasPrice,
  gasLimit: gasLimit,
  ethScanUrl: ethScanUrl,
};

export default config;
