import { PublicKey } from "@solana/web3.js";
import { Schema } from "borsh";

// In this case, i'll deserialize-read the account data of a launch PDA account of the Mantis Protocol launchpad
// of Smithii using Borsh.

// --- This is the struct of the account in the program ---

// #[account]
// pub struct Launch {
//     pub authority: Pubkey,
//     pub mint: Pubkey,
//     pub hardcap: u64,
//     pub softcap: u64,
//     pub sold_amount: u64,
//     pub whitelist_phase: Phase,
//     pub whitelist_limit: u64,
//     pub public_phase: Phase,
//     pub payment_method: PaymentMethod,
// }

//--- Where Phase is: ---
// pub struct Phase {
//     pub price: u64,
//     pub start_date: u64,
//     pub end_date: u64,
//     pub min_amount: u64,
//     pub max_amount: u64,
// }

// --- And Payment method: ---
// pub enum PaymentMethod {
//     Sol,
//     Usdt,
//     Usdc,
// }

// Define borsh schema of the account.
// --- Phase schema ---
const phaseSchema: Schema = {
  struct: {
    price: "u64",
    start_date: "u64",
    end_date: "u64",
    min_amount: "u64",
    max_amount: "u64",
  },
};

// --- Complete schema ---
// In the struct in rust we don't see the "discriminator" in the struct
// that's because is automatically added by anchor as unique identifier of the account in the program.
export const stateAccountSchema: Schema = {
  struct: {
    discriminator: { array: { type: "u8", len: 8 } }, // an slice of 8 bytes
    authority: { array: { type: "u8", len: 32 } }, // an slice of 32 bytes
    mint: { array: { type: "u8", len: 32 } }, // an slice of 32 bytes
    hardcap: "u64",
    softcap: "u64",
    sold_amount: "u64",
    whitelist_phase: phaseSchema,
    whitelist_limit: "u64",
    public_phase: phaseSchema,
    payment_method: "u8", // we defined the enum as u8 because each variant of the enum is a u8 value
  },
};

// --- readable interface of the account data ---

export interface Launch {
  authority: string;
  mint: string;
  hardcap: number;
  softcap: number;
  soldAmount: number;
  whitelistPhase: Phase;
  whitelistLimit: number;
  publicPhase: Phase;
  paymentMethod: PaymentMethod;
}

interface Phase {
  price: number;
  startDate: number;
  endDate: number;
  minAmount: number;
  maxAmount: number;
}

enum PaymentMethod {
  Sol,
  Usdc,
  Usdt,
}
