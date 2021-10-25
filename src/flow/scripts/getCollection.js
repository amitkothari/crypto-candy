export const GET_COLLECTION = `
  import CandyContract from 0xCandy
  
  pub fun main(addr: Address): Bool {
    let collection = getAccount(addr).getCapability<&{CandyContract.CollectionPublic}>(CandyContract.CollectionPublicPath).check()
    return collection
  }
`;
