import CandyContract from "../contracts/CandyContract.cdc"

transaction {
  prepare(acct: AuthAccount) {
    let collection <- CandyContract.createEmptyCollection()
    acct.save<@CandyContract.Collection>(<-collection, to: CandyContract.CollectionStoragePath)
    acct.link<&{CandyContract.CollectionPublic}>(CandyContract.CollectionPublicPath, target: CandyContract.CollectionStoragePath)
  }
}