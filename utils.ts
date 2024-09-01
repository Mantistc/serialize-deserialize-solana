import { Connection, PublicKey } from "@solana/web3.js";

// initialize a web3 connection. Use here your RPC end-point.
export const CONNECTION = new Connection("https://api.mainnet-beta.solana.com");

// declare the account address u'll deserialize-red the data.
// in this case, a PDA account of the Mantis Protocol launchpad of Smithii.
export const ACCOUNT_PUBKEY = new PublicKey(
  "3ja8zry6ez742qRKVwiaGea3FtxBqx3vfkzWQAy1bnod"
);
