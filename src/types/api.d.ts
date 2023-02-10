export interface TransferHashSubmitRequest {
  network: string;
  userAddress: string;
  transferHash: string;
}

export interface FeeHashSubmitRequest {
  network: string;
  userAddress: string;
  feeHash: string;
}

export interface LockHashSubmitRequest {
  network: string;
  userAddress: string;
  lockHash: string;
}

export interface DepositSubmitRequest {
  network: string;
  userAddress: string;
  depositHash: string;
}

export interface StatusRequest {
  network: string;
  userAddress: string;
}
