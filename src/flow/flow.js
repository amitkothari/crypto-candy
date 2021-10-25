import { query, mutate, tx } from '@onflow/fcl';
import { GET_COLLECTION, GET_VARIETIES, GET_CANDIES } from '../flow/scripts';
import { CREATE_COLLECTION, MINT_CANDY } from '../flow/transactions';

export const getVarieties = async () =>
  query({
    cadence: GET_VARIETIES,
  });

export const getCollection = async (address) =>
  query({
    cadence: GET_COLLECTION,
    args: (arg, t) => [arg(address, t.Address)],
  });

export const createCollection = async () => {
  let collectionPromise = await mutate({
    cadence: CREATE_COLLECTION,
    limit: 55,
  });
  await tx(collectionPromise).onceSealed();
};

export const mintCandy = async (varietyId, amount) => {
  let collectionPromise = await mutate({
    cadence: MINT_CANDY,
    limit: 55,
    args: (arg, t) => [
      arg(varietyId, t.UInt32),
      arg(amount.toString(), t.UFix64),
    ],
  });
  await tx(collectionPromise).onceSealed();
};

export const getUserCandies = async (address) => {
  const val = await query({
    cadence: GET_CANDIES,
    args: (arg, t) => [arg(address, t.Address)],
  });

  return Object.values(val);
};
