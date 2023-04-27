import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AssetRecipientChange } from "../generated/schema"
import { AssetRecipientChange as AssetRecipientChangeEvent } from "../generated/Contract/Contract"
import { handleAssetRecipientChange } from "../src/contract"
import { createAssetRecipientChangeEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let oldRecipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newRecipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAssetRecipientChangeEvent = createAssetRecipientChangeEvent(
      oldRecipient,
      newRecipient
    )
    handleAssetRecipientChange(newAssetRecipientChangeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AssetRecipientChange created and stored", () => {
    assert.entityCount("AssetRecipientChange", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AssetRecipientChange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldRecipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AssetRecipientChange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newRecipient",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
