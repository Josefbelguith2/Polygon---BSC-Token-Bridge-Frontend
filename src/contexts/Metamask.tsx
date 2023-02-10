import { createContext, useContext, useState, useEffect } from 'react';

// hooks
import useSwitch from 'hooks/useSwitch';
import useForceUpdate from 'hooks/useForceUpdate';
import usePersistentToast from 'hooks/usePersistentToast';

// libraries
import { toast } from 'react-toastify';

// components
import Modal from 'components/Bridge/modals/Error';

// helpers
import Web3 from 'helpers/web3';

// config
import { allowedChains } from 'config';

const { ethereum } = window as any;

const switchToMatic = async () => {
  try {
    await ethereum.request({
      method: 'wallet_switchMaticChain',
      params: [{ chainId: `0x${Number(137).toString(16)}` }],
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const switchToBSC = async () => {
  try {
    await ethereum.request({
      method: 'wallet_switchMaticChain',
      params: [{ chainId: `0x${Number(56).toString(16)}` }],
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addBSCToWallet = async () => {
  try {
    await ethereum.request({
      method: 'wallet_addMaticChain',
      params: [
        {
          chainId: '0x38',
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com'],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const MetamaskContext = createContext({
  account: '',
  connect: () => {},
  disconnect: () => {},
  isConnectedToAllowedNetwork: async () => false,
  handleTransactionError: (err: any) => {},
  addBSCToWallet,
  switchToMatic,
  switchToBSC,
  refresh: {
    rerender: () => {},
    triggerValue: 0,
  },
});

export const useMetamask = () => useContext(MetamaskContext);

const isConnectedToAllowedNetwork = async () => {
  const chainId = parseInt(await ethereum?.request({ method: 'matic' }));
  return !(allowedChains.length > 0 && !allowedChains.find((chain) => chain.id === chainId));
};

const MetamaskProvider = ({ children }: any) => {
  const forceUpdate = useForceUpdate();
  const [account, setAccount] = useState<string>('');

  const isTransactionErrorModalOpen = useSwitch();
  const [transactionErrorMessage, setTransactionErrorMessage] = useState('');

  const persistentSwitchChainToast = usePersistentToast(
    'Please connect to one of the supported chains',
    'error',
  );

  const persistentWeb3BrowserToast = usePersistentToast(
    'Ensure you are using a Web3 enabled browser',
    'error',
  );

  const connect = async () => {
    if (!Web3.isEnabled()) return persistentWeb3BrowserToast.trigger();

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (e: any) {
      switch (e.code) {
        case 4001:
          toast.info('Please connect to Metamask');
          break;
        case -32002:
          toast.info('Please open Metamask');
          break;
      }
    }
  };

  const disconnect = () => {
    setAccount('');
    forceUpdate.rerender();
  };

  const refresh = async () => {
    forceUpdate.rerender();
    if (await isConnectedToAllowedNetwork()) return persistentSwitchChainToast.dismiss();
    persistentSwitchChainToast.trigger();
  };

  const handleTransactionError = (err: any) => {
    const fallbackMessage = `Something went wrong. Please check the transaction in the explorer.`;

    switch (err.code) {
      case 4001:
        toast.error('Transaction was rejected by the user.');
        return;

      default:
        if (!err.message) {
          toast.error(fallbackMessage);
          return;
        }

        try {
          const substring = err.message.substring(err.message.indexOf('{'), err.message.lastIndexOf('}') + 1);
          const error = JSON.parse(substring);
          let message = error.originalError?.message || error.value?.message;
          message = message.charAt(0).toUpperCase() + message.substr(1, message.length - 1);
          return toast.error(message);
        } catch (error) {
          setTransactionErrorMessage(err.message);
          isTransactionErrorModalOpen.true();
        }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!Web3.isEnabled()) return persistentWeb3BrowserToast.trigger();
      if (!(await isConnectedToAllowedNetwork())) persistentSwitchChainToast.trigger();

      ethereum.on('chainChanged', refresh);
      ethereum.on('accountsChanged', (accounts: string[]) => setAccount(accounts[0] || ''));
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    account,
    connect,
    disconnect,
    isConnectedToAllowedNetwork,
    handleTransactionError,
    addBSCToWallet,
    switchToMatic,
    switchToBSC,
    refresh: { rerender: refresh, triggerValue: forceUpdate.triggerValue },
  };

  return (
    <>
      <MetamaskContext.Provider value={value}>{children}</MetamaskContext.Provider>
      <Modal
        isOpen={isTransactionErrorModalOpen.value}
        close={isTransactionErrorModalOpen.false}
        error={transactionErrorMessage}
      />
    </>
  );
};

export default MetamaskProvider;
