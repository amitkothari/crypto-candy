import CandyContract from "../contracts/CandyContract.cdc"

transaction(name: String, price: UFix64) {

  var adminRef: &CandyContract.Admin

  prepare(acct: AuthAccount) {
    self.adminRef = acct.borrow<&CandyContract.Admin>(from: CandyContract.AdminStoragePath) ?? panic("Cannot borrow admin ref")
  }

  execute {
    self.adminRef.createVariety(name: name, price: price)
  }
}
 