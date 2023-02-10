/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Deposited = ContractEventLog<{
  userAddress: string;
  amount: string;
  lockTxHash: string;
  0: string;
  1: string;
  2: string;
}>;
export type MetaTransactionExecuted = ContractEventLog<{
  ownerAddress: string;
  relayerAddress: string;
  functionSignature: string;
  returnData: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;

export interface Bridge extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Bridge;
  clone(): Bridge;
  methods: {
    deposit(
      user: string,
      amount: number | string | BN,
      lockTxHash: string
    ): NonPayableTransactionObject<void>;

    executeMetaTransaction(
      functionSignature: string | number[],
      sigR: string | number[],
      sigS: string | number[],
      sigV: number | string | BN
    ): NonPayableTransactionObject<string>;

    getChainId(): NonPayableTransactionObject<string>;

    getDomainSeperator(): NonPayableTransactionObject<string>;

    getNonce(user: string): NonPayableTransactionObject<string>;

    lockTxHashes(arg0: string): NonPayableTransactionObject<boolean>;

    owner(): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    token(): NonPayableTransactionObject<string>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;
  };
  events: {
    Deposited(cb?: Callback<Deposited>): EventEmitter;
    Deposited(options?: EventOptions, cb?: Callback<Deposited>): EventEmitter;

    MetaTransactionExecuted(
      cb?: Callback<MetaTransactionExecuted>
    ): EventEmitter;
    MetaTransactionExecuted(
      options?: EventOptions,
      cb?: Callback<MetaTransactionExecuted>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Deposited", cb: Callback<Deposited>): void;
  once(
    event: "Deposited",
    options: EventOptions,
    cb: Callback<Deposited>
  ): void;

  once(
    event: "MetaTransactionExecuted",
    cb: Callback<MetaTransactionExecuted>
  ): void;
  once(
    event: "MetaTransactionExecuted",
    options: EventOptions,
    cb: Callback<MetaTransactionExecuted>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;
}
