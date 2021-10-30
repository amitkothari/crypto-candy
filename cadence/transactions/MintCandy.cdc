import CandyContract from "../contracts/CandyContract.cdc"
import FUSD from "../contracts/FUSD.cdc"
import FungibleToken from "../contracts/FungibleToken.cdc"

transaction(varietyId: UInt32, amount: UFix64) {
  let receiverReference: &CandyContract.Collection{CandyContract.Receiver}
  let sentVault: @FungibleToken.Vault

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&CandyContract.Collection>(from: CandyContract.CollectionStoragePath) 
        ?? panic("Cannot borrow")
    let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD vault")
    self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    let newCandy <- CandyContract.mintCandy(varietyId: varietyId, paymentVault: <-self.sentVault)
    self.receiverReference.deposit(token: <-newCandy)
  }
}