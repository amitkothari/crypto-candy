
import FungibleToken from "./FungibleToken.cdc"

pub contract CandyContract {
  access(self) var varieties: {UInt32: Variety}
  
  pub var nextVarietyID: UInt32
  pub var totalCandies: UInt64
  
  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath

  pub struct Variety {
    pub let varietyId: UInt32
    pub let name: String
    pub let price: UFix64

    init(varietyId: UInt32, name: String, price: UFix64) {
      self.varietyId = varietyId
      self.name = name
      self.price = price
    }
  }

  pub resource Candy {
    pub let id: UInt64
    pub let data: Variety

    init(varietyId: UInt32) {
      pre {
        CandyContract.varieties[varietyId] != nil : "Could not create candy: variety does not exist."
      }
      CandyContract.totalCandies = CandyContract.totalCandies + 1
      self.id = CandyContract.totalCandies
      self.data = CandyContract.varieties[varietyId]!
    }
  }

  pub resource interface CollectionPublic {
    pub fun deposit(token: @Candy)
    pub fun getIDs(): [UInt64]
    pub fun getCandies(): {UInt64: Variety}
  }

  pub resource interface Provider {
    pub fun withdraw(withdrawID: UInt64): @Candy
  }

  pub resource interface Receiver {
    pub fun deposit(token: @Candy)
  }

  pub resource Collection: CollectionPublic, Provider, Receiver {
    pub var ownedCandies: @{UInt64: Candy}

    pub fun withdraw(withdrawID: UInt64): @Candy {
      let token <- self.ownedCandies.remove(key: withdrawID) 
        ?? panic("Could not withdraw candy: candy does not exist in the collection.")
      return <-token
    }

    pub fun deposit(token: @Candy) {
      let oldToken <- self.ownedCandies[token.id] <- token
      destroy oldToken
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedCandies.keys
    }

    pub fun getCandies(): {UInt64: Variety} {
      var variety: {UInt64:Variety} = {}

      for key in self.ownedCandies.keys {
        let candy = &self.ownedCandies[key] as &Candy
        variety.insert(key: candy.id, candy.data)
      }

      return variety
    }

    destroy() {
      destroy self.ownedCandies
    }

    init() {
      self.ownedCandies <- {}
    }
  }

  pub resource Admin {
    pub fun createVariety(name: String, price: UFix64): UInt32 {
      pre {
        name.length > 0 : "Could not create variety: name is required."
        price > 0.0 : "Could not create variety: price is required."
      }
      let newVarietyId = CandyContract.nextVarietyID
      CandyContract.varieties[newVarietyId] = Variety(varietyId: newVarietyId, name: name, price: price)
      CandyContract.nextVarietyID = CandyContract.nextVarietyID + 1
      return newVarietyId
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }

  pub fun mintCandy(varietyId: UInt32, paymentVault: @FungibleToken.Vault): @Candy {
    pre {
      self.varieties[varietyId] != nil : "Could not mint candy: variety does not exist."
      paymentVault.balance >= self.varieties[varietyId]!.price : "Could not mint candy: insufficient balance."
    }
    destroy paymentVault
    return <- create Candy(varietyId: varietyId)
  }

  pub fun getVarieties(): {UInt32: Variety} {
    return self.varieties
  }

  init() {
    self.varieties = {}
    self.totalCandies = 0
    self.nextVarietyID = 1
    self.CollectionStoragePath = /storage/CandyCollection
    self.CollectionPublicPath = /public/CandyCollectionPublic
    self.AdminStoragePath = /storage/CandyAdmin
    self.account.save<@Admin>(<- create Admin(), to: self.AdminStoragePath)
  }
}