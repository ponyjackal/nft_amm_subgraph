import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AssetRecipientChange,
  DeltaUpdate,
  ERC721Deposit,
  FeeUpdate,
  OwnershipTransferred,
  SpotPriceUpdate,
  Swap,
  Sync,
  TokenDeposit,
  TokenWithdrawal,
  WithdrawERC721
} from "../generated/Contract/Contract"

export function createAssetRecipientChangeEvent(
  oldRecipient: Address,
  newRecipient: Address
): AssetRecipientChange {
  let assetRecipientChangeEvent = changetype<AssetRecipientChange>(
    newMockEvent()
  )

  assetRecipientChangeEvent.parameters = new Array()

  assetRecipientChangeEvent.parameters.push(
    new ethereum.EventParam(
      "oldRecipient",
      ethereum.Value.fromAddress(oldRecipient)
    )
  )
  assetRecipientChangeEvent.parameters.push(
    new ethereum.EventParam(
      "newRecipient",
      ethereum.Value.fromAddress(newRecipient)
    )
  )

  return assetRecipientChangeEvent
}

export function createDeltaUpdateEvent(
  oldDelta: BigInt,
  newDelta: BigInt
): DeltaUpdate {
  let deltaUpdateEvent = changetype<DeltaUpdate>(newMockEvent())

  deltaUpdateEvent.parameters = new Array()

  deltaUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "oldDelta",
      ethereum.Value.fromUnsignedBigInt(oldDelta)
    )
  )
  deltaUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "newDelta",
      ethereum.Value.fromUnsignedBigInt(newDelta)
    )
  )

  return deltaUpdateEvent
}

export function createERC721DepositEvent(
  depositer: Address,
  ids: Array<BigInt>
): ERC721Deposit {
  let erc721DepositEvent = changetype<ERC721Deposit>(newMockEvent())

  erc721DepositEvent.parameters = new Array()

  erc721DepositEvent.parameters.push(
    new ethereum.EventParam("depositer", ethereum.Value.fromAddress(depositer))
  )
  erc721DepositEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )

  return erc721DepositEvent
}

export function createFeeUpdateEvent(
  oldFee: BigInt,
  newFee: BigInt
): FeeUpdate {
  let feeUpdateEvent = changetype<FeeUpdate>(newMockEvent())

  feeUpdateEvent.parameters = new Array()

  feeUpdateEvent.parameters.push(
    new ethereum.EventParam("oldFee", ethereum.Value.fromUnsignedBigInt(oldFee))
  )
  feeUpdateEvent.parameters.push(
    new ethereum.EventParam("newFee", ethereum.Value.fromUnsignedBigInt(newFee))
  )

  return feeUpdateEvent
}

export function createOwnershipTransferredEvent(
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSpotPriceUpdateEvent(
  oldSpotPrice: BigInt,
  newSpotPrice: BigInt
): SpotPriceUpdate {
  let spotPriceUpdateEvent = changetype<SpotPriceUpdate>(newMockEvent())

  spotPriceUpdateEvent.parameters = new Array()

  spotPriceUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "oldSpotPrice",
      ethereum.Value.fromUnsignedBigInt(oldSpotPrice)
    )
  )
  spotPriceUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "newSpotPrice",
      ethereum.Value.fromUnsignedBigInt(newSpotPrice)
    )
  )

  return spotPriceUpdateEvent
}

export function createSwapEvent(
  sender: Address,
  tokenIn: BigInt,
  nftIdsIn: Array<BigInt>,
  tokenOut: BigInt,
  nftIdsOut: Array<BigInt>,
  recipient: Address
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIn",
      ethereum.Value.fromUnsignedBigInt(tokenIn)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "nftIdsIn",
      ethereum.Value.fromUnsignedBigIntArray(nftIdsIn)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "tokenOut",
      ethereum.Value.fromUnsignedBigInt(tokenOut)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "nftIdsOut",
      ethereum.Value.fromUnsignedBigIntArray(nftIdsOut)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return swapEvent
}

export function createSyncEvent(reserve0: BigInt, reserve1: BigInt): Sync {
  let syncEvent = changetype<Sync>(newMockEvent())

  syncEvent.parameters = new Array()

  syncEvent.parameters.push(
    new ethereum.EventParam(
      "reserve0",
      ethereum.Value.fromUnsignedBigInt(reserve0)
    )
  )
  syncEvent.parameters.push(
    new ethereum.EventParam(
      "reserve1",
      ethereum.Value.fromUnsignedBigInt(reserve1)
    )
  )

  return syncEvent
}

export function createTokenDepositEvent(
  sender: Address,
  amount: BigInt
): TokenDeposit {
  let tokenDepositEvent = changetype<TokenDeposit>(newMockEvent())

  tokenDepositEvent.parameters = new Array()

  tokenDepositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  tokenDepositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenDepositEvent
}

export function createTokenWithdrawalEvent(
  recipient: Address,
  amount: BigInt
): TokenWithdrawal {
  let tokenWithdrawalEvent = changetype<TokenWithdrawal>(newMockEvent())

  tokenWithdrawalEvent.parameters = new Array()

  tokenWithdrawalEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  tokenWithdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenWithdrawalEvent
}

export function createWithdrawERC721Event(
  recipient: Address,
  ids: Array<BigInt>
): WithdrawERC721 {
  let withdrawErc721Event = changetype<WithdrawERC721>(newMockEvent())

  withdrawErc721Event.parameters = new Array()

  withdrawErc721Event.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  withdrawErc721Event.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )

  return withdrawErc721Event
}
