# Serialize & Deserialize data on Solana using Borsh

I made this repo because sometimes when we create custom smart contracts (programs) and we want to call the instructions of this programs and read the accounts data in our applications, we just use anchor because yeah, it's easy and friendly to use. But, we lose the concepts and understanding behind of this actions.

So, with this, you will be able to understand what are those bytes behind of an account on solana and convert it in a human-like readable thing. And also how to convert human-like data arguments of a instruction (like numbers, strings, whatever) in serialized instruction data to create an instruction in a more "native" way.

## Setup

Install Node.js, Ts-node & Typescript on your computer

## Quickstart

Clone the repository.

```shell
git clone https://github.com/Mantistc/serialize-deserialize-solana
cd https://github.com/Mantistc/serialize-deserialize-solana &&
npm install
```

## Run Stuff
- To deserialize and read account data:
```shell
ts-node deserialize
```
- To serialize instruction data:
```shell
ts-node serialize
```

<p align="center">
  Made with ❤️ by <a href="https://twitter.com/solscihub" target="_blank">@solscihub</a>
</p>
