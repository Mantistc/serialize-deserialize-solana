import { PublicKey } from "@solana/web3.js";
import { DeserializeAccountData } from "./deserializer";
import { Launch, stateAccountSchema } from "./account-schema";
import { ACCOUNT_PUBKEY, CONNECTION } from "../utils";

// We are using borsh 2.0.0 schemas to deserialize the account state.

// --- deserializer function ---

// This function can deserialize, format and read the data of any Solana account.
// all you have to do is:
// 1. know the rust struct of the account
// 2. know the address of the account to deserialize
// 3. run this code xd

async function readSerializedAccountData() {
  // here we get the account byte array data
  const accountDataAsBuffer = (await CONNECTION.getAccountInfo(ACCOUNT_PUBKEY))
    ?.data;

  // deserialize the data & get a readable schema
  const deserializedData = new DeserializeAccountData(
    stateAccountSchema,
    accountDataAsBuffer!!
  ).toReadeableValue();

  // because we get a Schema returned value, we can't access to its values as an object (because its like an "any" typed), so
  // we can get the values of the object and put it in an array, so will be easy to access.
  // this is just a way to do it, you can change in this part whatever u want that improve this method.
  const accountValues = Object.values(deserializedData.valueOf());

  const whitelistPhaseValues = Object.values(
    accountValues[6].valueOf() // the position in the array of the whitelist phase values
  ) as any[];

  const publicPhaseValues = Object.values(accountValues[8]).valueOf() as any[]; // the position in the array of the public phase values

  // format the values into the values you want
  const launch: Launch = {
    authority: new PublicKey(accountValues[1] as Array<number>).toBase58(), // we start from index 1 because index 0 is the discriminator
    mint: new PublicKey(accountValues[2] as Array<number>).toBase58(),
    // here we convert the big number behind of this as string and transform it into a number value. If you want the big number, don't convert it.
    hardcap: parseInt(accountValues[3].toString()),
    softcap: parseInt(accountValues[4].toString()),
    soldAmount: parseInt(accountValues[5].toString()),
    whitelistPhase: {
      price: parseInt(whitelistPhaseValues[0].toString()),
      startDate: parseInt(whitelistPhaseValues[1].toString()),
      endDate: parseInt(whitelistPhaseValues[2].toString()),
      minAmount: parseInt(whitelistPhaseValues[3].toString()),
      maxAmount: parseInt(whitelistPhaseValues[4].toString()),
    },
    whitelistLimit: parseInt(accountValues[7].toString()),
    publicPhase: {
      price: parseInt(publicPhaseValues[0].toString()),
      startDate: parseInt(publicPhaseValues[1].toString()),
      endDate: parseInt(publicPhaseValues[2].toString()),
      minAmount: parseInt(publicPhaseValues[3].toString()),
      maxAmount: parseInt(publicPhaseValues[4].toString()),
    },
    paymentMethod: accountValues[9] as number,
  };

  // log the values and read the current state of an account of a custom smart contract on solana
  console.log(launch);
}

// execute the deserialization
// that's all my friends, that's how without using anchor, you can deserialize-read the data of a solana account
// and understand exactly what that bytes means of each account :).
readSerializedAccountData();
