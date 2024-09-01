import { Schema, deserialize } from "borsh";

export class DeserializeAccountData {
  /**
   * Schema of the account to deserialize-read
   */
  private schema: Schema;
  /**
   * Account buffer-like data
   */
  private buffer: Buffer;

  constructor(schema: Schema, buffer: Buffer) {
    this.schema = schema;
    this.buffer = buffer;
  }
  /**
   * Returns a readable Schema value array-like
   */
  toReadeableValue(): Schema {
    const decodedValues = deserialize(this.schema, this.buffer);
    return decodedValues as Schema;
  }
}
