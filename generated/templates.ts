// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  DataSourceTemplate,
  DataSourceContext
} from "@graphprotocol/graph-ts";

export class SeacowsPairERC721 extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("SeacowsPairERC721", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "SeacowsPairERC721",
      [address.toHex()],
      context
    );
  }
}
