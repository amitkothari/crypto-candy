export const GET_VARIETIES = `
  import CandyContract from 0xCandy

  pub fun main(): {UInt32: CandyContract.Variety} {
    return CandyContract.getVarieties()
  }
`;
