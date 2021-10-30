import path from 'path';

import { emulator, init, getAccountAddress, mintFlow } from 'flow-js-testing';

import {
  deployCryptoCandyContract,
  createCandyVariety,
  mintCandy,
  createCandyCollection,
  getUserCandies,
  getVarieties,
} from './utils/candyContract';

import { fundAccountWithFUSD } from './utils/FUSD';

jest.setTimeout(50000);

const TEST_CANDY = {
  varietyId: 1,
  name: 'Orange',
  price: '5.00000000',
};

describe('CryptoCandy', () => {
  const basePath = path.resolve(__dirname, '../');
  const port = 8080;

  beforeEach(async () => {
    init(basePath, port);
    await emulator.start(port, false);
  });

  afterEach(async () => {
    await emulator.stop();
  });

  it('should deploy crypto candy contract', async () => {
    await deployCryptoCandyContract();
  });

  it('should return empty variety list', async () => {
    await deployCryptoCandyContract();
    const candyVarieties = await getVarieties();
    expect(candyVarieties).toMatchObject({});
  });

  it('should create new variety', async () => {
    await deployCryptoCandyContract();
    await createCandyVariety(TEST_CANDY);
    const candyVarieties = await getVarieties();
    expect(candyVarieties['1']).toMatchObject(TEST_CANDY);
  });

  it('should mint FUSD', async () => {
    const recipient = await getAccountAddress('candyRecipient');
    const balance = await fundAccountWithFUSD(recipient, '100.00');
    expect(balance).toBe('100.00000000');
  });

  it('should mint a candy', async () => {
    await deployCryptoCandyContract();
    await createCandyVariety(TEST_CANDY);

    const recipient = await getAccountAddress('candyRecipient');

    await mintFlow(recipient, '10.0');
    await fundAccountWithFUSD(recipient, '100.00');

    await createCandyCollection(recipient);
    await mintCandy(recipient, TEST_CANDY);

    const userDappies = await getUserCandies(recipient);
    expect(userDappies['1']).toMatchObject(TEST_CANDY);
  });
});
