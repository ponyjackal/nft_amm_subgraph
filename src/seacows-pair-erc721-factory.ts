import { BigInt } from "@graphprotocol/graph-ts";
import {
  NewPair as NewPairEvent,
  CreatePairETHCall,
  CreatePairERC20Call,
} from "../generated/SeacowsPairERC721Factory/SeacowsPairERC721Factory";
import {
  // NewPair,
  Pair,
  // DailyPoolStat,
  // DailyProtocolStat,
} from "../generated/schema";
import { SeacowsPairERC721 } from "../generated/templates";
import { plusBigInt } from "./utilities";
import { WETH } from "./constants";
import { Contract } from "../generated/Contract/Contract";

// export function handleCreatePairETH(event: CreatePairETHCall): void {
//   let newPair = NewPair.load(event.transaction.hash.toHexString());
//   if (!newPair) {
//     newPair = new NewPair(event.transaction.hash.toHexString());
//   }
//   const nft = event.inputs._nft.toHexString();
//   newPair.nft = nft;
//   newPair.erc20Contract = WETH;
//   newPair.initialBondingCurveAddress = event.inputs._bondingCurve.toHexString();
//   newPair.initialAssetRecipient = event.inputs._assetRecipient.toHexString();
//   newPair.poolType = BigInt.fromI32(event.inputs._poolType);
//   newPair.initialDelta = event.inputs._delta;
//   newPair.initialFee = event.inputs._fee;
//   newPair.initialSpotPrice = event.inputs._spotPrice;
//   newPair.initialNFTIdInventory = event.inputs._initialNFTIDs;
//   newPair.initialInventoryCount = BigInt.fromI32(
//     event.inputs._initialNFTIDs.length
//   );
//   newPair.initialTokenLiquidity = event.transaction.value;
//   newPair.owner = event.from.toHexString();
//   newPair.save();

//   const dayString = new Date(event.block.timestamp.toI64() * 1000)
//     .toISOString()
//     .slice(0, 10)
//     .replaceAll("-", "");
//   let poolStats = DailyPoolStat.load(nft + "-" + dayString);
//   // todo: initial and current pair attributes/counts
//   if (!poolStats) {
//     poolStats = new DailyPoolStat(nft + "-" + dayString);
//     poolStats.dayString = dayString;
//     poolStats.nftContract = newPair.nft;
//   }
//   poolStats.tokenDeposited = plusBigInt(
//     event.transaction.value,
//     poolStats.tokenDeposited
//   );
//   poolStats.nftsDeposited = plusBigInt(
//     BigInt.fromI32(event.inputs._initialNFTIDs.length),
//     poolStats.nftsDeposited
//   );
//   poolStats.save();
//   let protocolStats = DailyProtocolStat.load(dayString);
//   if (!protocolStats) {
//     protocolStats = new DailyProtocolStat(dayString);
//     protocolStats.dayString = dayString;
//   }
//   protocolStats.tokenDeposited = plusBigInt(
//     event.transaction.value,
//     protocolStats.tokenDeposited
//   );
//   protocolStats.nftsDeposited = plusBigInt(
//     BigInt.fromI32(event.inputs._initialNFTIDs.length),
//     protocolStats.nftsDeposited
//   );
//   protocolStats.numPairsCreated = plusBigInt(
//     BigInt.fromI32(1),
//     protocolStats.numPairsCreated
//   );
//   protocolStats.save();
//   // protocolStats.numPoolsCreated = plusBigInt(BigInt.fromI32(1), protocolStats.numPoolsCreated)
// }

// export function handleCreatePairERC20(event: CreatePairERC20Call): void {
//   let newPair = NewPair.load(event.transaction.hash.toHexString());
//   if (!newPair) {
//     newPair = new NewPair(event.transaction.hash.toHexString());
//   }
//   const param = event.inputs.params;
//   const nft = param.nft.toHexString();
//   newPair.nft = nft;
//   newPair.erc20Contract = param.token.toHexString();
//   newPair.initialBondingCurveAddress = param.bondingCurve.toHexString();
//   newPair.initialAssetRecipient = param.assetRecipient.toHexString();
//   newPair.poolType = BigInt.fromI32(param.poolType);
//   newPair.initialDelta = param.delta;
//   newPair.initialFee = param.fee;
//   newPair.initialSpotPrice = param.spotPrice;
//   newPair.initialNFTIdInventory = param.initialNFTIDs;
//   newPair.initialInventoryCount = BigInt.fromI32(param.initialNFTIDs.length);
//   newPair.initialTokenLiquidity = param.initialTokenBalance;
//   newPair.owner = event.from.toHexString();
//   newPair.save();

//   const dayString = new Date(event.block.timestamp.toI64() * 1000)
//     .toISOString()
//     .slice(0, 10)
//     .replaceAll("-", "");
//   let poolStats = DailyPoolStat.load(nft + "-" + dayString);
//   // todo: initial and current pair attributes/counts
//   if (!poolStats) {
//     poolStats = new DailyPoolStat(nft + "-" + dayString);
//     poolStats.dayString = dayString;
//     poolStats.nftContract = newPair.nft;
//   }
//   poolStats.tokenDeposited = plusBigInt(
//     event.transaction.value,
//     poolStats.tokenDeposited
//   );
//   poolStats.nftsDeposited = plusBigInt(
//     BigInt.fromI32(param.initialNFTIDs.length),
//     poolStats.nftsDeposited
//   );
//   poolStats.save();
//   let protocolStats = DailyProtocolStat.load(dayString);
//   if (!protocolStats) {
//     protocolStats = new DailyProtocolStat(dayString);
//     protocolStats.dayString = dayString;
//   }
//   protocolStats.tokenDeposited = plusBigInt(
//     event.transaction.value,
//     protocolStats.tokenDeposited
//   );
//   protocolStats.nftsDeposited = plusBigInt(
//     BigInt.fromI32(param.initialNFTIDs.length),
//     protocolStats.nftsDeposited
//   );
//   protocolStats.numPairsCreated = plusBigInt(
//     BigInt.fromI32(1),
//     protocolStats.numPairsCreated
//   );
//   protocolStats.save();
//   // protocolStats.numPoolsCreated = plusBigInt(BigInt.fromI32(1), protocolStats.numPoolsCreated)
// }

export function handleNewPair(event: NewPairEvent): void {
  SeacowsPairERC721.create(event.params.poolAddress);
  let pair = Pair.load(event.transaction.hash.toHexString());
  if (!pair) {
    pair = new Pair(event.params.poolAddress.toHexString());
  }
  pair.createdAt = event.block.timestamp;
  pair.updatedAt = event.block.timestamp;
  pair.createdTx = event.transaction.hash.toHexString();
  pair.owner = event.transaction.from.toHexString();

  let pairContract = Contract.bind(event.params.poolAddress);
  pair.nft = pairContract.nft().toHexString();
  // pair.erc20Contract = pairContract.token().toHexString();
  // pair.bondingCurveAddress = pairContract.bondingCurve().toHexString();
  // pair.assetRecipient = pairContract.assetRecipient().toHexString();
  // pair.poolType = BigInt.fromI32(pairContract.poolType());
  // pair.delta = BigInt.fromI32(pairContract.poolType());
  // pair.fee = BigInt.fromI32(pairContract.poolType());
  // pair.spotPrice = BigInt.fromI32(pairContract.poolType());

  pair.save();
}
