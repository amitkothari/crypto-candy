import {
  getAccountAddress,
  mintFlow,
  deployContractByName,
  sendTransaction,
  executeScript,
} from 'flow-js-testing';

export const getAdminAddress = async () => getAccountAddress('ContractAdmin');

export const deployCryptoCandyContract = async () => {
  const contractAdmin = await getAccountAddress('ContractAdmin');
  await mintFlow(contractAdmin, '10.0');
  const addressMap = { FungibleToken: '0xee82856bf20e2aa6' };
  await deployContractByName({
    to: contractAdmin,
    name: 'CandyContract',
    addressMap,
  });
};

export const getVarieties = async () => {
  return executeScript({ name: 'GetVarieties' });
};

export const createCandyVariety = async (candy) => {
  const contractAdmin = await getAdminAddress();
  const signers = [contractAdmin];
  const args = [candy.name, candy.price];
  await sendTransaction({ name: 'CreateVariety', signers, args });
};

export const createCandyCollection = async (recipient) => {
  const signers = [recipient];
  await sendTransaction({ name: 'CreateCollection', signers });
};

export const mintCandy = async (recipient, candy) => {
  const signers = [recipient];
  const args = [candy.varietyId, candy.price];
  await sendTransaction({ name: 'MintCandy', args, signers });
};

export const getUserCandies = async (recipient) => {
  const args = [recipient];
  return executeScript({ name: 'GetUserCandies', args });
};
