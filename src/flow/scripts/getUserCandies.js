export const GET_CANDIES = `
  import CandyContract from 0xCandy

  pub fun main(addr: Address): {UInt64: CandyContract.Variety} {
    let account = getAccount(addr)

    let ref = account.getCapability<&{CandyContract.CollectionPublic}>(CandyContract.CollectionPublicPath)
                .borrow() ?? panic("Cannot borrow reference")
    
    return ref.getCandies()
  }
`;
