// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AssetRecipientChange extends ethereum.Event {
  get params(): AssetRecipientChange__Params {
    return new AssetRecipientChange__Params(this);
  }
}

export class AssetRecipientChange__Params {
  _event: AssetRecipientChange;

  constructor(event: AssetRecipientChange) {
    this._event = event;
  }

  get oldRecipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newRecipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DeltaUpdate extends ethereum.Event {
  get params(): DeltaUpdate__Params {
    return new DeltaUpdate__Params(this);
  }
}

export class DeltaUpdate__Params {
  _event: DeltaUpdate;

  constructor(event: DeltaUpdate) {
    this._event = event;
  }

  get oldDelta(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newDelta(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ERC721Deposit extends ethereum.Event {
  get params(): ERC721Deposit__Params {
    return new ERC721Deposit__Params(this);
  }
}

export class ERC721Deposit__Params {
  _event: ERC721Deposit;

  constructor(event: ERC721Deposit) {
    this._event = event;
  }

  get depositer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }
}

export class FeeUpdate extends ethereum.Event {
  get params(): FeeUpdate__Params {
    return new FeeUpdate__Params(this);
  }
}

export class FeeUpdate__Params {
  _event: FeeUpdate;

  constructor(event: FeeUpdate) {
    this._event = event;
  }

  get oldFee(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newFee(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get newOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class SpotPriceUpdate extends ethereum.Event {
  get params(): SpotPriceUpdate__Params {
    return new SpotPriceUpdate__Params(this);
  }
}

export class SpotPriceUpdate__Params {
  _event: SpotPriceUpdate;

  constructor(event: SpotPriceUpdate) {
    this._event = event;
  }

  get oldSpotPrice(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newSpotPrice(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Swap extends ethereum.Event {
  get params(): Swap__Params {
    return new Swap__Params(this);
  }
}

export class Swap__Params {
  _event: Swap;

  constructor(event: Swap) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenIn(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get nftIdsIn(): Array<BigInt> {
    return this._event.parameters[2].value.toBigIntArray();
  }

  get tokenOut(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get nftIdsOut(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }

  get recipient(): Address {
    return this._event.parameters[5].value.toAddress();
  }
}

export class Sync extends ethereum.Event {
  get params(): Sync__Params {
    return new Sync__Params(this);
  }
}

export class Sync__Params {
  _event: Sync;

  constructor(event: Sync) {
    this._event = event;
  }

  get reserve0(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get reserve1(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TokenDeposit extends ethereum.Event {
  get params(): TokenDeposit__Params {
    return new TokenDeposit__Params(this);
  }
}

export class TokenDeposit__Params {
  _event: TokenDeposit;

  constructor(event: TokenDeposit) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TokenWithdrawal extends ethereum.Event {
  get params(): TokenWithdrawal__Params {
    return new TokenWithdrawal__Params(this);
  }
}

export class TokenWithdrawal__Params {
  _event: TokenWithdrawal;

  constructor(event: TokenWithdrawal) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class WithdrawERC721 extends ethereum.Event {
  get params(): WithdrawERC721__Params {
    return new WithdrawERC721__Params(this);
  }
}

export class WithdrawERC721__Params {
  _event: WithdrawERC721;

  constructor(event: WithdrawERC721) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }
}

export class SeacowsPairERC721__getBuyNFTQuoteResult {
  value0: i32;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: i32,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getError(): i32 {
    return this.value0;
  }

  getNewSpotPrice(): BigInt {
    return this.value1;
  }

  getNewDelta(): BigInt {
    return this.value2;
  }

  getInputAmount(): BigInt {
    return this.value3;
  }

  getProtocolFee(): BigInt {
    return this.value4;
  }
}

export class SeacowsPairERC721__getReservesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  get_nftReserve(): BigInt {
    return this.value0;
  }

  get_tokenReserve(): BigInt {
    return this.value1;
  }

  get_blockTimestampLast(): BigInt {
    return this.value2;
  }
}

export class SeacowsPairERC721__getSellNFTQuoteResult {
  value0: i32;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: i32,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getError(): i32 {
    return this.value0;
  }

  getNewSpotPrice(): BigInt {
    return this.value1;
  }

  getNewDelta(): BigInt {
    return this.value2;
  }

  getOutputAmount(): BigInt {
    return this.value3;
  }

  getProtocolFee(): BigInt {
    return this.value4;
  }
}

export class SeacowsPairERC721 extends ethereum.SmartContract {
  static bind(address: Address): SeacowsPairERC721 {
    return new SeacowsPairERC721("SeacowsPairERC721", address);
  }

  assetRecipient(): Address {
    let result = super.call("assetRecipient", "assetRecipient():(address)", []);

    return result[0].toAddress();
  }

  try_assetRecipient(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "assetRecipient",
      "assetRecipient():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bondingCurve(): Address {
    let result = super.call("bondingCurve", "bondingCurve():(address)", []);

    return result[0].toAddress();
  }

  try_bondingCurve(): ethereum.CallResult<Address> {
    let result = super.tryCall("bondingCurve", "bondingCurve():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  delta(): BigInt {
    let result = super.call("delta", "delta():(uint128)", []);

    return result[0].toBigInt();
  }

  try_delta(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("delta", "delta():(uint128)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  factory(): Address {
    let result = super.call("factory", "factory():(address)", []);

    return result[0].toAddress();
  }

  try_factory(): ethereum.CallResult<Address> {
    let result = super.tryCall("factory", "factory():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  fee(): BigInt {
    let result = super.call("fee", "fee():(uint96)", []);

    return result[0].toBigInt();
  }

  try_fee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("fee", "fee():(uint96)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAssetRecipient(): Address {
    let result = super.call(
      "getAssetRecipient",
      "getAssetRecipient():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getAssetRecipient(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getAssetRecipient",
      "getAssetRecipient():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getBuyNFTQuote(numOfNfts: BigInt): SeacowsPairERC721__getBuyNFTQuoteResult {
    let result = super.call(
      "getBuyNFTQuote",
      "getBuyNFTQuote(uint256):(uint8,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(numOfNfts)]
    );

    return new SeacowsPairERC721__getBuyNFTQuoteResult(
      result[0].toI32(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_getBuyNFTQuote(
    numOfNfts: BigInt
  ): ethereum.CallResult<SeacowsPairERC721__getBuyNFTQuoteResult> {
    let result = super.tryCall(
      "getBuyNFTQuote",
      "getBuyNFTQuote(uint256):(uint8,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(numOfNfts)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SeacowsPairERC721__getBuyNFTQuoteResult(
        value[0].toI32(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  getReserves(): SeacowsPairERC721__getReservesResult {
    let result = super.call(
      "getReserves",
      "getReserves():(uint256,uint256,uint256)",
      []
    );

    return new SeacowsPairERC721__getReservesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_getReserves(): ethereum.CallResult<SeacowsPairERC721__getReservesResult> {
    let result = super.tryCall(
      "getReserves",
      "getReserves():(uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SeacowsPairERC721__getReservesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  getSellNFTQuote(numOfNfts: BigInt): SeacowsPairERC721__getSellNFTQuoteResult {
    let result = super.call(
      "getSellNFTQuote",
      "getSellNFTQuote(uint256):(uint8,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(numOfNfts)]
    );

    return new SeacowsPairERC721__getSellNFTQuoteResult(
      result[0].toI32(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_getSellNFTQuote(
    numOfNfts: BigInt
  ): ethereum.CallResult<SeacowsPairERC721__getSellNFTQuoteResult> {
    let result = super.tryCall(
      "getSellNFTQuote",
      "getSellNFTQuote(uint256):(uint8,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(numOfNfts)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SeacowsPairERC721__getSellNFTQuoteResult(
        value[0].toI32(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  isProtocolFeeDisabled(): boolean {
    let result = super.call(
      "isProtocolFeeDisabled",
      "isProtocolFeeDisabled():(bool)",
      []
    );

    return result[0].toBoolean();
  }

  try_isProtocolFeeDisabled(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isProtocolFeeDisabled",
      "isProtocolFeeDisabled():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  nft(): Address {
    let result = super.call("nft", "nft():(address)", []);

    return result[0].toAddress();
  }

  try_nft(): ethereum.CallResult<Address> {
    let result = super.tryCall("nft", "nft():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  onERC721Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: Bytes
  ): Bytes {
    let result = super.call(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromBytes(param3)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC721Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromBytes(param3)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  pairVariant(): i32 {
    let result = super.call("pairVariant", "pairVariant():(uint8)", []);

    return result[0].toI32();
  }

  try_pairVariant(): ethereum.CallResult<i32> {
    let result = super.tryCall("pairVariant", "pairVariant():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  poolType(): i32 {
    let result = super.call("poolType", "poolType():(uint8)", []);

    return result[0].toI32();
  }

  try_poolType(): ethereum.CallResult<i32> {
    let result = super.tryCall("poolType", "poolType():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  spotPrice(): BigInt {
    let result = super.call("spotPrice", "spotPrice():(uint128)", []);

    return result[0].toBigInt();
  }

  try_spotPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("spotPrice", "spotPrice():(uint128)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  swapNFTsForToken(
    nftIds: Array<BigInt>,
    minExpectedTokenOutput: BigInt,
    tokenRecipient: Address
  ): BigInt {
    let result = super.call(
      "swapNFTsForToken",
      "swapNFTsForToken(uint256[],uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigIntArray(nftIds),
        ethereum.Value.fromUnsignedBigInt(minExpectedTokenOutput),
        ethereum.Value.fromAddress(tokenRecipient)
      ]
    );

    return result[0].toBigInt();
  }

  try_swapNFTsForToken(
    nftIds: Array<BigInt>,
    minExpectedTokenOutput: BigInt,
    tokenRecipient: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "swapNFTsForToken",
      "swapNFTsForToken(uint256[],uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigIntArray(nftIds),
        ethereum.Value.fromUnsignedBigInt(minExpectedTokenOutput),
        ethereum.Value.fromAddress(tokenRecipient)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  weth(): Address {
    let result = super.call("weth", "weth():(address)", []);

    return result[0].toAddress();
  }

  try_weth(): ethereum.CallResult<Address> {
    let result = super.tryCall("weth", "weth():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ChangeAssetRecipientCall extends ethereum.Call {
  get inputs(): ChangeAssetRecipientCall__Inputs {
    return new ChangeAssetRecipientCall__Inputs(this);
  }

  get outputs(): ChangeAssetRecipientCall__Outputs {
    return new ChangeAssetRecipientCall__Outputs(this);
  }
}

export class ChangeAssetRecipientCall__Inputs {
  _call: ChangeAssetRecipientCall;

  constructor(call: ChangeAssetRecipientCall) {
    this._call = call;
  }

  get newRecipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ChangeAssetRecipientCall__Outputs {
  _call: ChangeAssetRecipientCall;

  constructor(call: ChangeAssetRecipientCall) {
    this._call = call;
  }
}

export class ChangeDeltaCall extends ethereum.Call {
  get inputs(): ChangeDeltaCall__Inputs {
    return new ChangeDeltaCall__Inputs(this);
  }

  get outputs(): ChangeDeltaCall__Outputs {
    return new ChangeDeltaCall__Outputs(this);
  }
}

export class ChangeDeltaCall__Inputs {
  _call: ChangeDeltaCall;

  constructor(call: ChangeDeltaCall) {
    this._call = call;
  }

  get newDelta(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ChangeDeltaCall__Outputs {
  _call: ChangeDeltaCall;

  constructor(call: ChangeDeltaCall) {
    this._call = call;
  }
}

export class ChangeSpotPriceCall extends ethereum.Call {
  get inputs(): ChangeSpotPriceCall__Inputs {
    return new ChangeSpotPriceCall__Inputs(this);
  }

  get outputs(): ChangeSpotPriceCall__Outputs {
    return new ChangeSpotPriceCall__Outputs(this);
  }
}

export class ChangeSpotPriceCall__Inputs {
  _call: ChangeSpotPriceCall;

  constructor(call: ChangeSpotPriceCall) {
    this._call = call;
  }

  get newSpotPrice(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ChangeSpotPriceCall__Outputs {
  _call: ChangeSpotPriceCall;

  constructor(call: ChangeSpotPriceCall) {
    this._call = call;
  }
}

export class DepositERC20Call extends ethereum.Call {
  get inputs(): DepositERC20Call__Inputs {
    return new DepositERC20Call__Inputs(this);
  }

  get outputs(): DepositERC20Call__Outputs {
    return new DepositERC20Call__Outputs(this);
  }
}

export class DepositERC20Call__Inputs {
  _call: DepositERC20Call;

  constructor(call: DepositERC20Call) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositERC20Call__Outputs {
  _call: DepositERC20Call;

  constructor(call: DepositERC20Call) {
    this._call = call;
  }
}

export class DepositERC721Call extends ethereum.Call {
  get inputs(): DepositERC721Call__Inputs {
    return new DepositERC721Call__Inputs(this);
  }

  get outputs(): DepositERC721Call__Outputs {
    return new DepositERC721Call__Outputs(this);
  }
}

export class DepositERC721Call__Inputs {
  _call: DepositERC721Call;

  constructor(call: DepositERC721Call) {
    this._call = call;
  }

  get ids(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class DepositERC721Call__Outputs {
  _call: DepositERC721Call;

  constructor(call: DepositERC721Call) {
    this._call = call;
  }
}

export class DepositETHCall extends ethereum.Call {
  get inputs(): DepositETHCall__Inputs {
    return new DepositETHCall__Inputs(this);
  }

  get outputs(): DepositETHCall__Outputs {
    return new DepositETHCall__Outputs(this);
  }
}

export class DepositETHCall__Inputs {
  _call: DepositETHCall;

  constructor(call: DepositETHCall) {
    this._call = call;
  }
}

export class DepositETHCall__Outputs {
  _call: DepositETHCall;

  constructor(call: DepositETHCall) {
    this._call = call;
  }
}

export class DisableProtocolFeeCall extends ethereum.Call {
  get inputs(): DisableProtocolFeeCall__Inputs {
    return new DisableProtocolFeeCall__Inputs(this);
  }

  get outputs(): DisableProtocolFeeCall__Outputs {
    return new DisableProtocolFeeCall__Outputs(this);
  }
}

export class DisableProtocolFeeCall__Inputs {
  _call: DisableProtocolFeeCall;

  constructor(call: DisableProtocolFeeCall) {
    this._call = call;
  }

  get _isProtocolFeeDisabled(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class DisableProtocolFeeCall__Outputs {
  _call: DisableProtocolFeeCall;

  constructor(call: DisableProtocolFeeCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get param(): InitializeCallParamStruct {
    return changetype<InitializeCallParamStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCallParamStruct extends ethereum.Tuple {
  get factory(): Address {
    return this[0].toAddress();
  }

  get bondingCurve(): Address {
    return this[1].toAddress();
  }

  get nft(): Address {
    return this[2].toAddress();
  }

  get poolType(): i32 {
    return this[3].toI32();
  }

  get token(): Address {
    return this[4].toAddress();
  }

  get owner(): Address {
    return this[5].toAddress();
  }

  get assetRecipient(): Address {
    return this[6].toAddress();
  }

  get delta(): BigInt {
    return this[7].toBigInt();
  }

  get fee(): BigInt {
    return this[8].toBigInt();
  }

  get spotPrice(): BigInt {
    return this[9].toBigInt();
  }

  get weth(): Address {
    return this[10].toAddress();
  }
}

export class OnERC721ReceivedCall extends ethereum.Call {
  get inputs(): OnERC721ReceivedCall__Inputs {
    return new OnERC721ReceivedCall__Inputs(this);
  }

  get outputs(): OnERC721ReceivedCall__Outputs {
    return new OnERC721ReceivedCall__Outputs(this);
  }
}

export class OnERC721ReceivedCall__Inputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value1(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value2(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get value3(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class OnERC721ReceivedCall__Outputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class SwapNFTsForTokenCall extends ethereum.Call {
  get inputs(): SwapNFTsForTokenCall__Inputs {
    return new SwapNFTsForTokenCall__Inputs(this);
  }

  get outputs(): SwapNFTsForTokenCall__Outputs {
    return new SwapNFTsForTokenCall__Outputs(this);
  }
}

export class SwapNFTsForTokenCall__Inputs {
  _call: SwapNFTsForTokenCall;

  constructor(call: SwapNFTsForTokenCall) {
    this._call = call;
  }

  get nftIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get minExpectedTokenOutput(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get tokenRecipient(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SwapNFTsForTokenCall__Outputs {
  _call: SwapNFTsForTokenCall;

  constructor(call: SwapNFTsForTokenCall) {
    this._call = call;
  }

  get outputAmount(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SwapTokenForNFTsCall extends ethereum.Call {
  get inputs(): SwapTokenForNFTsCall__Inputs {
    return new SwapTokenForNFTsCall__Inputs(this);
  }

  get outputs(): SwapTokenForNFTsCall__Outputs {
    return new SwapTokenForNFTsCall__Outputs(this);
  }
}

export class SwapTokenForNFTsCall__Inputs {
  _call: SwapTokenForNFTsCall;

  constructor(call: SwapTokenForNFTsCall) {
    this._call = call;
  }

  get nftIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get maxExpectedTokenInput(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get nftRecipient(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SwapTokenForNFTsCall__Outputs {
  _call: SwapTokenForNFTsCall;

  constructor(call: SwapTokenForNFTsCall) {
    this._call = call;
  }

  get inputAmount(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SyncReserveCall extends ethereum.Call {
  get inputs(): SyncReserveCall__Inputs {
    return new SyncReserveCall__Inputs(this);
  }

  get outputs(): SyncReserveCall__Outputs {
    return new SyncReserveCall__Outputs(this);
  }
}

export class SyncReserveCall__Inputs {
  _call: SyncReserveCall;

  constructor(call: SyncReserveCall) {
    this._call = call;
  }
}

export class SyncReserveCall__Outputs {
  _call: SyncReserveCall;

  constructor(call: SyncReserveCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawERC20Call extends ethereum.Call {
  get inputs(): WithdrawERC20Call__Inputs {
    return new WithdrawERC20Call__Inputs(this);
  }

  get outputs(): WithdrawERC20Call__Outputs {
    return new WithdrawERC20Call__Outputs(this);
  }
}

export class WithdrawERC20Call__Inputs {
  _call: WithdrawERC20Call;

  constructor(call: WithdrawERC20Call) {
    this._call = call;
  }

  get _recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawERC20Call__Outputs {
  _call: WithdrawERC20Call;

  constructor(call: WithdrawERC20Call) {
    this._call = call;
  }
}

export class WithdrawERC721Call extends ethereum.Call {
  get inputs(): WithdrawERC721Call__Inputs {
    return new WithdrawERC721Call__Inputs(this);
  }

  get outputs(): WithdrawERC721Call__Outputs {
    return new WithdrawERC721Call__Outputs(this);
  }
}

export class WithdrawERC721Call__Inputs {
  _call: WithdrawERC721Call;

  constructor(call: WithdrawERC721Call) {
    this._call = call;
  }

  get nftIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class WithdrawERC721Call__Outputs {
  _call: WithdrawERC721Call;

  constructor(call: WithdrawERC721Call) {
    this._call = call;
  }
}
