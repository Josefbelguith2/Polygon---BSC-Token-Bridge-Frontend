import { FC, SVGProps } from 'react';

export interface AllowedChainConfig {
  id: number;
  name: string;
}

export interface ContractConfig {
  name: string;
  address: string;
  abi: any;
}

export interface Network {
  name: string;
  symbol: 'matic' | 'bsc';
  Icon: FC<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
}

export interface Coin {
  icon: string;
  symbol: string;
  name: string;
  url: string;
  method: 'burn' | 'lock';
  address: {
    matic: string;
    bsc: string;
  };
  contract: {
    matic: any;
    bsc: any;
  };
}
