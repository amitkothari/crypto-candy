export const MINT_CANDY = `
  import CandyContract from 0xCandy
  import FUSD from 0xFUSD
  import FungibleToken from 0xFungibleToken

  transaction(varietyId: UInt32, amount: UFix64) {
    let receiverReference: &CandyContract.Collection{CandyContract.Receiver}
    let sentVault: @FungibleToken.Vault

    prepare(acct: AuthAccount) {
      self.receiverReference = acct.borrow<&CandyContract.Collection>(from: CandyContract.CollectionStoragePath) 
          ?? panic("Cannot borrow reference")
      let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD vault")
      self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {
      let newCandy <- CandyContract.mintCandy(varietyId: varietyId, paymentVault: <-self.sentVault)
      self.receiverReference.deposit(token: <-newCandy)
    }
  }
`;
