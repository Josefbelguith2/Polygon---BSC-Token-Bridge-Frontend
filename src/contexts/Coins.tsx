import { createContext, useContext, useState, useEffect } from 'react';
import { useMetamask } from './Metamask';

// libraries
import { toast } from 'react-toastify';

// helpers
import Web3 from 'helpers/web3';

// config
import { app, ContractAddress } from 'config';
import { coins } from 'config';

// types
import { Coin } from 'types/config';

const { ethereum } = window as any;

const CoinsContext = createContext({
  balance: 0,
  coins: {
    list: coins,
    selected: coins[0],
    update: (coin: Coin) => {},
  },
  updateBalance: () => {},
  addTokenToWallet: () => {},
});

export const useCoin = () => useContext(CoinsContext);

const addTokenToWallet = async () => {
  const web3 = Web3.instance;
  const connectedNetwork = await web3.eth.net.getId();

  let tokenAddress = null;
  switch (connectedNetwork) {
    case 137:
      tokenAddress = ContractAddress.MUMBAI_TOKEN;
      break;

    case 56:
      tokenAddress = ContractAddress.BSC_TOKEN;
      break;

    default:
      toast.error('Please switch to BSC or Matic Network');
      break;
  }

  try {
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: app.company.token,
          decimals: 18,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const CoinsProvider = ({ children }: any) => {
  const { account, refresh } = useMetamask();

  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    const web3 = Web3.instance;

    const networkID = await web3.eth.net.getId();
    let balance = '0';
    switch (networkID) {
      case 137:
      case 80001:
        balance = await selectedCoin.contract.matic.methods.balanceOf(account).call();
        break;

      case 56:
      case 97:
        balance = await selectedCoin.contract.bsc.methods.balanceOf(account).call();
        break;
    }

    setBalance(parseInt(web3.utils.fromWei(balance)));
  };

  useEffect(() => {
    if (account) fetchBalance();
  }, [account, selectedCoin, refresh.triggerValue]);

  const value = {
    balance,
    addTokenToWallet,
    coins: {
      list: coins,
      selected: selectedCoin,
      update: setSelectedCoin,
    },
    updateBalance: fetchBalance,
  };

  return <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>;
};

export default CoinsProvider;
