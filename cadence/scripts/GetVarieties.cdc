import CandyContract from "../contracts/CandyContract.cdc"

pub fun main(): {UInt32: CandyContract.Variety} {
  return CandyContract.getVarieties()
}
