import { BigInt } from "@graphprotocol/graph-ts";
import {
  AssetRecipientChange as AssetRecipientChangeEvent,
  DeltaUpdate as DeltaUpdateEvent,
  ERC721Deposit as ERC721DepositEvent,
  FeeUpdate as FeeUpdateEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SpotPriceUpdate as SpotPriceUpdateEvent,
  Swap as SwapEvent,
  TokenDeposit as TokenDepositEvent,
  TokenWithdrawal as TokenWithdrawalEvent,
  WithdrawERC721 as WithdrawERC721Event,
  InitializeCall,
} from "../generated/templates/SeacowsPairERC721/SeacowsPairERC721";
import {
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
  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.assetRecipient = event.params.newRecipient.toHexString();
    pair.updatedAt = event.block.timestamp;
  }
}

export function handleDeltaUpdate(event: DeltaUpdateEvent): void {
  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.delta = event.params.newDelta;
    pair.updatedAt = event.block.timestamp;
  }
}

export function handleERC721Deposit(event: ERC721DepositEvent): void {
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

  const dailyPoolStatId = pair.nft! + "-" + dayString;
  let dailyPoolStats = DailyPoolStat.load(dailyPoolStatId);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(dailyPoolStatId);
    dailyPoolStats.nftsDeposited = BigInt.fromI32(0);
  }
  dailyPoolStats.nftsDeposited = plusBigInt(
    dailyPoolStats.nftsDeposited,
    BigInt.fromI32(numOfNfts)
  );
}

export function handleFeeUpdate(event: FeeUpdateEvent): void {
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
  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.owner = event.params.newOwner.toHexString();
    pair.updatedAt = event.block.timestamp;
    pair.save();
  }
}

export function handleSpotPriceUpdate(event: SpotPriceUpdateEvent): void {
  let pair = Pair.load(event.address.toHexString())!;
  updatePairAttributesIfMissing(pair);
  if (pair) {
    pair.spotPrice = event.params.newSpotPrice;
    pair.updatedAt = event.block.timestamp;
    pair.save();
  }
}

export function handleSwap(event: SwapEvent): void {
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

  const dailyPoolStatId = pair.nft! + "-" + dayString;
  let dailyPoolStats = DailyPoolStat.load(dailyPoolStatId);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(dailyPoolStatId);
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

export function handleTokenDeposit(event: TokenDepositEvent): void {
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
    event.params.amount
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
    dailyPairStats.tokenDeposited = BigInt.fromI32(0);
  }
  dailyPairStats.tokenDeposited = plusBigInt(
    dailyPairStats.tokenDeposited,
    event.params.amount
  );

  const dailyPoolStatId = pair.nft! + "-" + dayString;
  let dailyPoolStats = DailyPoolStat.load(dailyPoolStatId);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(dailyPoolStatId);
    dailyPoolStats.tokenDeposited = BigInt.fromI32(0);
  }
  dailyPoolStats.tokenDeposited = plusBigInt(
    dailyPoolStats.tokenDeposited,
    event.params.amount
  );
}

export function handleTokenWithdrawal(event: TokenWithdrawalEvent): void {
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
    event.params.amount
  );

  let dailyPairStats = DailyPairStat.load(pair.id + "-" + dayString);
  if (!dailyPairStats) {
    dailyPairStats = new DailyPairStat(pair.id + "-" + dayString);
    dailyPairStats.tokenWithdrawn = BigInt.fromI32(0);
  }
  dailyPairStats.tokenWithdrawn = plusBigInt(
    dailyPairStats.tokenWithdrawn,
    event.params.amount
  );

  const dailyPoolStatId = pair.nft! + "-" + dayString;
  let dailyPoolStats = DailyPoolStat.load(dailyPoolStatId);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(dailyPoolStatId);
    dailyPoolStats.tokenWithdrawn = BigInt.fromI32(0);
  }
  dailyPoolStats.tokenWithdrawn = plusBigInt(
    dailyPoolStats.tokenWithdrawn,
    event.params.amount
  );
}

export function handleWithdrawERC721(event: WithdrawERC721Event): void {
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

  const dailyPoolStatId = pair.nft! + "-" + dayString;
  let dailyPoolStats = DailyPoolStat.load(dailyPoolStatId);
  if (!dailyPoolStats) {
    dailyPoolStats = new DailyPoolStat(dailyPoolStatId);
    dailyPoolStats.nftsWithdrawn = BigInt.fromI32(0);
  }
  dailyPoolStats.nftsWithdrawn = plusBigInt(
    dailyPoolStats.nftsWithdrawn,
    BigInt.fromI32(numOfNfts)
  );
}

export function handleInitialize(event: InitializeCall): void {
  let pair = Pair.load(event.to.toHexString())!;

  updatePairAttributesIfMissing(pair);
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
    pair.nftIdInventory = pair.nftIdInventory || newPair.initialNFTIdInventory;
    pair.nft = pair.nft || newPair.nft;
    pair.erc20Contract = pair.erc20Contract || newPair.erc20Contract;
    pair.owner = pair.owner || newPair.owner;
    pair.poolType = pair.poolType || newPair.poolType;
    pair.spotPrice = pair.spotPrice || newPair.initialSpotPrice;
    pair.tokenLiquidity = pair.tokenLiquidity || newPair.initialTokenLiquidity;
    pair.save();
  }
}
