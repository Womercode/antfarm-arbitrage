import axios from 'axios';
import AsyncLock from 'async-lock';

import config from './config';
import log from './log';

const lock = new AsyncLock();

let ethPrice = 0;

// clear bnb price every hour
setInterval(() => {
  lock
    .acquire('eth-price', () => {
      ethPrice = 0;
      return;
    })
    .then(() => {});
}, 3600000);

export async function getethPrice(): Promise<number> {
  return await lock.acquire('eth-price', async () => {
    if (ethPrice !== 0) {
      return ethPrice;
    }
    const res = await axios.get(config.ethScanUrl);
    ethPrice = parseFloat(res.data.result.ethusd);
    log.info(`ETH price: $${ethPrice}`);
    return ethPrice;
  });
}
