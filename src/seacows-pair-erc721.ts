import { BigInt } from "@graphprotocol/graph-ts";
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
  WithdrawERC721 as WithdrawERC721Event,
} from "../generated/templates/SeacowsPairERC721/SeacowsPairERC721";
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
  WithdrawERC721,
  NewPair,
  Pair,
  DailyPoolStat,
  DailyProtocolStat,
  DailyPairStat,
} from "../generated/schema";
import { plusBigInt } from "./utilities";

export function handleAssetRecipientChange(
  event: AssetRecipientChangeEvent
): void {
  let entity = new AssetRecipientChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldRecipient = event.params.oldRecipient;
  entity.newRecipient = event.params.newRecipient;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.assetRecipient = event.params.newRecipient.toHexString();
    pair.updatedAt = event.block.timestamp;
  }
}

export function handleDeltaUpdate(event: DeltaUpdateEvent): void {
  let entity = new DeltaUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldDelta = event.params.oldDelta;
  entity.newDelta = event.params.newDelta;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.delta = event.params.newDelta;
    pair.updatedAt = event.block.timestamp;
  }
}

export function handleERC721Deposit(event: ERC721DepositEvent): void {
  let entity = new ERC721Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.depositor = event.params.depositer;
  entity.ids = event.params.ids;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.pair = event.address.toHexString();

  entity.save();

  const numOfNfts = event.params.ids.length;
  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  pair.inventoryCount = pair.inventoryCount!.plus(BigInt.fromI32(numOfNfts));
  pair.nftIdInventory = pair.nftIdInventory!.concat(event.params.ids);

  const dayString = new Date(event.block.timestamp.toI64() * 1000)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  let dailyProtocolStats = DailyProtocolStat.load(dayString);
  if (!dailyProtocolStats) {
    dailyProtocolStats = new DailyProtocolStat(dayString);
    dailyProtocolStats.nftsDeposited = BigInt.fromI32(0);
  }
  dailyProtocolStats.nftsDeposited = plusBigInt(
    dailyProtocolStats.nftsDeposited,
    BigInt.fromI32(numOfNfts)
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
    dailyPairStats.nftsDeposited = BigInt.fromI32(0);
  }
  dailyPairStats.nftsDeposited = plusBigInt(
    dailyPairStats.nftsDeposited,
    BigInt.fromI32(numOfNfts)
  );

  let dailyPoolStats = DailyPoolStat.load(pair.nft + "-" + dayString);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(pair.nft + "-" + dayString);
    dailyPoolStats.nftsDeposited = BigInt.fromI32(0);
  }
  dailyPoolStats.nftsDeposited = plusBigInt(
    dailyPoolStats.nftsDeposited,
    BigInt.fromI32(numOfNfts)
  );
}

export function handleFeeUpdate(event: FeeUpdateEvent): void {
  let entity = new FeeUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldFee = event.params.oldFee;
  entity.newFee = event.params.newFee;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.fee = event.params.newFee;
    pair.updatedAt = event.block.timestamp;
    pair.save();
  }
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newOwner = event.params.newOwner;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.owner = event.params.newOwner.toHexString();
    pair.updatedAt = event.block.timestamp;
    pair.save();
  }
}

export function handleSpotPriceUpdate(event: SpotPriceUpdateEvent): void {
  let entity = new SpotPriceUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldSpotPrice = event.params.oldSpotPrice;
  entity.newSpotPrice = event.params.newSpotPrice;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.spotPrice = event.params.newSpotPrice;
    pair.updatedAt = event.block.timestamp;
    pair.save();
  }

  entity.save();
}

export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.tokenIn = event.params.tokenIn;
  entity.nftIdsIn = event.params.nftIdsIn;
  entity.tokenOut = event.params.tokenOut;
  entity.nftIdsOut = event.params.nftIdsOut;
  entity.recipient = event.params.recipient;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);

  // we remove assets from the pair
  pair.tokenLiquidity = pair.tokenLiquidity!.minus(event.params.tokenOut);
  pair.inventoryCount = pair.inventoryCount!.minus(
    BigInt.fromI32(event.params.nftIdsOut.length)
  );
  // NOTE; Closure is not working, thats why I iterate the loop
  for (let i = 0; i < event.params.nftIdsOut.length; i++) {
    const index = pair.nftIdInventory!.indexOf(event.params.nftIdsOut[i]);
    pair.nftIdInventory!.slice(index, 1);
  }

  const numOfNftsOut = event.params.nftIdsOut.length;
  const numOfNftsIn = event.params.nftIdsIn.length;

  const dayString = new Date(event.block.timestamp.toI64() * 1000)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  let dailyProtocolStats = DailyProtocolStat.load(dayString);
  if (!dailyProtocolStats) {
    dailyProtocolStats = new DailyProtocolStat(dayString);
  }
  dailyProtocolStats.numSwaps = plusBigInt(
    dailyProtocolStats.numSwaps,
    BigInt.fromI32(numOfNftsOut)
  );
  dailyProtocolStats.numSwaps = plusBigInt(
    dailyProtocolStats.numSwaps,
    BigInt.fromI32(numOfNftsIn)
  );
  dailyProtocolStats.swapVolume = plusBigInt(
    dailyProtocolStats.swapVolume,
    event.params.tokenOut
  );
  dailyProtocolStats.swapVolume = plusBigInt(
    dailyProtocolStats.swapVolume,
    event.params.tokenIn
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
  }
  dailyPairStats.numSwaps = plusBigInt(
    dailyPairStats.numSwaps,
    BigInt.fromI32(numOfNftsOut)
  );
  dailyPairStats.numSwaps = plusBigInt(
    dailyPairStats.numSwaps,
    BigInt.fromI32(numOfNftsIn)
  );
  dailyPairStats.swapVolume = plusBigInt(
    dailyPairStats.swapVolume,
    event.params.tokenOut
  );
  dailyPairStats.swapVolume = plusBigInt(
    dailyPairStats.swapVolume,
    event.params.tokenOut
  );

  let dailyPoolStats = DailyPoolStat.load(pair.nft + "-" + dayString);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(pair.nft + "-" + dayString);
  }
  dailyPoolStats.numSwaps = plusBigInt(
    dailyPoolStats.numSwaps,
    BigInt.fromI32(numOfNftsOut)
  );
  dailyPoolStats.numSwaps = plusBigInt(
    dailyPoolStats.numSwaps,
    BigInt.fromI32(numOfNftsIn)
  );
  dailyPoolStats.swapVolume = plusBigInt(
    dailyPoolStats.swapVolume,
    event.params.tokenOut
  );
  dailyPoolStats.swapVolume = plusBigInt(
    dailyPoolStats.swapVolume,
    event.params.tokenOut
  );
}

export function handleSync(event: SyncEvent): void {
  let entity = new Sync(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.reserve0 = event.params.reserve0;
  entity.reserve1 = event.params.reserve1;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenDeposit(event: TokenDepositEvent): void {
  let entity = new TokenDeposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.amount = event.params.amount;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  pair.tokenLiquidity = pair.tokenLiquidity!.plus(event.transaction.value);

  const dayString = new Date(event.block.timestamp.toI64() * 1000)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  let dailyProtocolStats = DailyProtocolStat.load(dayString);
  if (!dailyProtocolStats) {
    dailyProtocolStats = new DailyProtocolStat(dayString);
    dailyProtocolStats.tokenDeposited = BigInt.fromI32(0);
  }
  dailyProtocolStats.tokenDeposited = plusBigInt(
    dailyProtocolStats.tokenDeposited,
    entity.amount
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
    dailyPairStats.tokenDeposited = BigInt.fromI32(0);
  }
  dailyPairStats.tokenDeposited = plusBigInt(
    dailyPairStats.tokenDeposited,
    entity.amount
  );

  let dailyPoolStats = DailyPoolStat.load(pair.nft + "-" + dayString);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(pair.nft + "-" + dayString);
    dailyPoolStats.tokenDeposited = BigInt.fromI32(0);
  }
  dailyPoolStats.tokenDeposited = plusBigInt(
    dailyPoolStats.tokenDeposited,
    entity.amount
  );
}

export function handleTokenWithdrawal(event: TokenWithdrawalEvent): void {
  let entity = new TokenWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipient = event.params.recipient;
  entity.amount = event.params.amount;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  pair.tokenLiquidity = pair.tokenLiquidity!.minus(event.params.amount);

  const dayString = new Date(event.block.timestamp.toI64() * 1000)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  let dailyProtocolStats = DailyProtocolStat.load(dayString);
  if (!dailyProtocolStats) {
    dailyProtocolStats = new DailyProtocolStat(dayString);
    dailyProtocolStats.tokenWithdrawn = BigInt.fromI32(0);
  }
  dailyProtocolStats.tokenWithdrawn = plusBigInt(
    dailyProtocolStats.tokenWithdrawn,
    entity.amount
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
    dailyPairStats.tokenWithdrawn = BigInt.fromI32(0);
  }
  dailyPairStats.tokenWithdrawn = plusBigInt(
    dailyPairStats.tokenWithdrawn,
    entity.amount
  );

  let dailyPoolStats = DailyPoolStat.load(pair.nft + "-" + dayString);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(pair.nft + "-" + dayString);
    dailyPoolStats.tokenWithdrawn = BigInt.fromI32(0);
  }
  dailyPoolStats.tokenWithdrawn = plusBigInt(
    dailyPoolStats.tokenWithdrawn,
    entity.amount
  );
}

export function handleWithdrawERC721(event: WithdrawERC721Event): void {
  let entity = new WithdrawERC721(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipient = event.params.recipient;
  entity.ids = event.params.ids;
  entity.pair = event.address.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const numOfNfts = event.params.ids.length;

  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  pair.inventoryCount = pair.inventoryCount!.minus(BigInt.fromI32(numOfNfts));
  // pair.nftIdInventory = pair.nftIdInventory!.filter(id => !event.params.ids.includes(id));

  // NOTE; Closure is not working, thats why I iterate the loop
  for (let i = 0; i < numOfNfts; i++) {
    const index = pair.nftIdInventory!.indexOf(event.params.ids[i]);
    pair.nftIdInventory!.slice(index, 1);
  }

  const dayString = new Date(event.block.timestamp.toI64() * 1000)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  let dailyProtocolStats = DailyProtocolStat.load(dayString);
  if (!dailyProtocolStats) {
    dailyProtocolStats = new DailyProtocolStat(dayString);
    dailyProtocolStats.nftsWithdrawn = BigInt.fromI32(0);
  }
  dailyProtocolStats.nftsWithdrawn = plusBigInt(
    dailyProtocolStats.nftsWithdrawn,
    BigInt.fromI32(numOfNfts)
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
    dailyPairStats.nftsWithdrawn = BigInt.fromI32(0);
  }
  dailyPairStats.nftsWithdrawn = plusBigInt(
    dailyPairStats.nftsWithdrawn,
    BigInt.fromI32(numOfNfts)
  );

  let dailyPoolStats = DailyPoolStat.load(pair.nft + "-" + dayString);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(pair.nft + "-" + dayString);
    dailyPoolStats.nftsWithdrawn = BigInt.fromI32(0);
  }
  dailyPoolStats.nftsWithdrawn = plusBigInt(
    dailyPoolStats.nftsWithdrawn,
    BigInt.fromI32(numOfNfts)
  );
}

export function updatePairAttributesIfMissing(pair: Pair): void {
  if (!pair.spotPrice) {
    let newPair = NewPair.load(pair.createdTx!)!;
    pair.assetRecipient = pair.assetRecipient || newPair.initialAssetRecipient;
    pair.bondingCurveAddress =
      pair.bondingCurveAddress || newPair.initialBondingCurveAddress;
    pair.delta = pair.delta || newPair.initialDelta;
    pair.fee = pair.fee || newPair.initialFee;
    pair.inventoryCount = pair.inventoryCount || newPair.initialInventoryCount;
    pair.nft = pair.nft || newPair.nft;
    pair.owner = pair.owner || newPair.owner;
    pair.poolType = pair.poolType || newPair.poolType;
    pair.spotPrice = pair.spotPrice || newPair.initialSpotPrice;
    pair.tokenLiquidity = pair.tokenLiquidity || newPair.initialTokenLiquidity;
    pair.save();
  }
}
