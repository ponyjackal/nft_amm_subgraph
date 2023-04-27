import {
  AssetRecipientChange as AssetRecipientChangeEvent,
  DeltaUpdate as DeltaUpdateEvent,
  ERC721Deposit as ERC721DepositEvent,
  FeeUpdate as FeeUpdateEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SpotPriceUpdate as SpotPriceUpdateEvent,
  Swap as SwapEvent,
  Sync as SyncEvent,
  TokenDeposit as TokenDepositEvent,
  TokenWithdrawal as TokenWithdrawalEvent,
  WithdrawERC721 as WithdrawERC721Event
} from "../generated/Contract/Contract"
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
} from "../generated/schema"

export function handleAssetRecipientChange(
  event: AssetRecipientChangeEvent
): void {
  let entity = new AssetRecipientChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldRecipient = event.params.oldRecipient
  entity.newRecipient = event.params.newRecipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeltaUpdate(event: DeltaUpdateEvent): void {
  let entity = new DeltaUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldDelta = event.params.oldDelta
  entity.newDelta = event.params.newDelta

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleERC721Deposit(event: ERC721DepositEvent): void {
  let entity = new ERC721Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.depositer = event.params.depositer
  entity.ids = event.params.ids

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeUpdate(event: FeeUpdateEvent): void {
  let entity = new FeeUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldFee = event.params.oldFee
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSpotPriceUpdate(event: SpotPriceUpdateEvent): void {
  let entity = new SpotPriceUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldSpotPrice = event.params.oldSpotPrice
  entity.newSpotPrice = event.params.newSpotPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.tokenIn = event.params.tokenIn
  entity.nftIdsIn = event.params.nftIdsIn
  entity.tokenOut = event.params.tokenOut
  entity.nftIdsOut = event.params.nftIdsOut
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSync(event: SyncEvent): void {
  let entity = new Sync(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.reserve0 = event.params.reserve0
  entity.reserve1 = event.params.reserve1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenDeposit(event: TokenDepositEvent): void {
  let entity = new TokenDeposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenWithdrawal(event: TokenWithdrawalEvent): void {
  let entity = new TokenWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawERC721(event: WithdrawERC721Event): void {
  let entity = new WithdrawERC721(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.ids = event.params.ids

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
