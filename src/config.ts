// abis
import { abi as TokenABI } from 'abis/Token.json';
import { abi as BridgeABI } from 'abis/Bridge.json';
import { abi as LockABI } from 'abis/Lock.json';

// types
import { Token } from 'types/Token';
import { Bridge } from 'types/Bridge';
import { LOCK } from 'types/LOCK';
import { AllowedChainConfig, ContractConfig, Network, Coin } from 'types/config';

// assets
import { ReactComponent as maticNetwork } from 'assets/logos/polygon-matic.svg';
import { ReactComponent as binanceNetwork } from 'assets/logos/binance-network.svg';
import logo from 'assets/logos/Logo2.png';

// helpers
import Contracts from 'helpers/contracts';

export const allowedChains: AllowedChainConfig[] = [
  // Mainnets
  { id: 56, name: 'BSC Mainnet' },
  {id: 137, name: 'Polygon Mainnet'},
  // Testnets
  { id: 80001, name: 'MUMBAI TESTNET' },
  // { id: 97, name: 'BSC Testnet' },
];

export const ContractAddress = {
  MUMBAI_TOKEN: '0x52459834ca561cb55411699e9c2143683bcf865f',
  BSC_TOKEN: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
  MUMBAI_LOCK: '',
  BSC_BRIDGE: '',
};

export const contracts: ContractConfig[] = [
  { name: 'MUMBAI_TOKEN', address: ContractAddress.MUMBAI_TOKEN, abi: TokenABI },
  { name: 'BSC_TOKEN', address: ContractAddress.BSC_TOKEN, abi: TokenABI },
  { name: 'MUMBAI_LOCK', address: ContractAddress.MUMBAI_LOCK, abi: LockABI },
  { name: 'BSC_BRIDGE', address: ContractAddress.BSC_BRIDGE, abi: BridgeABI },
];

export interface ContractInstances {
  MUMBAI_TOKEN: Token;
  BSC_TOKEN: Token;
  MUMBAI_LOCK: LOCK;
  BSC_BRIDGE: Bridge;
}

export const app = {
  company: {
    name: 'Token Bridge',
    copyright: '© Youssef Belguith',
    token: 'BTKN',
  },
};

export const coins: Coin[] = [
  {
    icon: logo,
    symbol: 'BTKN',
    name: 'Bridge Token',
    url: '',
    method: 'burn',
    address: {
      matic: ContractAddress.MUMBAI_TOKEN,
      bsc: ContractAddress.BSC_TOKEN,
    },
    contract: {
      matic: Contracts.instances.MUMBAI_TOKEN,
      bsc: Contracts.instances.BSC_TOKEN,
    },
  },
];

export const networks: Network[] = [
  { name: 'Matic Network', Icon: maticNetwork, symbol: 'matic' },
  { name: 'Binance Smart Chain Network', Icon: binanceNetwork, symbol: 'bsc' },
];
