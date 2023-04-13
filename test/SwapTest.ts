import { Contract } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import pool from '@ricokahler/pool';
import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { FlashBot } from '../typechain/FlashBot';
import { IWETH } from '../typechain/IWETH';

describe('Flashswap', () => {
  let weth: IWETH;
  let flashBot: FlashBot;

  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  const ATF = '0xE3e87577BF7AbFAca3B3AB37Ee3521ecA839506E';

  beforeEach(async () => {
    const wethFactory = (await ethers.getContractAt('IWETH', WETH)) as IWETH;
    weth = wethFactory.attach(WETH) as IWETH;

    const fbFactory = await ethers.getContractFactory('FlashBot');
    flashBot = (await fbFactory.deploy(WETH)) as FlashBot;
  });

  describe('flash swap arbitrage', () => {
    let signer: SignerWithAddress;

    let pool1: any;
    let pool1Pair: Contract;
    let pool2: any;
    const uniFactoryAbi = ['function getPair(address, address) view returns (address pair)'];
    const uniPairAbi = ['function sync()'];


    before(async () => {
      [signer] = await ethers.getSigners();
      pool1 = '0x73b1818f5CeF5053CC1030A01b540024B3EB778b';
      pool1Pair = new ethers.Contract(pool1, uniPairAbi, waffle.provider)
      pool2 = '0x6413CbEa89514Fb49D0D5E9f5458Af356c2eda57';
    });

    it('do flash swap between 1% and 10%', async () => {
      // transfer 100000 to mdex pair
      const amountEth = ethers.utils.parseEther('100000');
      await weth.deposit({ value: amountEth });
      await weth.transfer(pool1, amountEth);
      await pool1Pair.connect(signer).sync();

      const balanceBefore = await ethers.provider.getBalance(flashBot.address);
      await flashBot.flashArbitrage(pool1, pool2);
      const balanceAfter = await ethers.provider.getBalance(flashBot.address);

      expect(balanceAfter).to.be.gt(balanceBefore);
    });

    it('calculate how much profit we get', async () => {
      // transfer 100000 to mdex pair
      const amountEth = ethers.utils.parseEther('100000');
      await weth.deposit({ value: amountEth });
      await weth.transfer(pool1, amountEth);
      await pool1Pair.connect(signer).sync();

      const res = await flashBot.getProfit(pool1, pool2);
      expect(res.profit).to.be.gt(ethers.utils.parseEther('500'));
      expect(res.baseToken).to.be.eq(WETH);
    });

    it('revert if callback is called from address without permission', async () => {
      await expect(
        flashBot.UniswapV2Call(flashBot.address, ethers.utils.parseEther('1000'), 0, '0xabcd')
      ).to.be.revertedWith('Non permissioned address call');
    });
  });
});
