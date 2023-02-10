import { ChangeEvent, useState } from 'react';

// hooks
import useSwitch from 'hooks/useSwitch';

// contexts
import { useMetamask } from 'contexts/Metamask';
import { useCoin } from 'contexts/Coins';

// libraries
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';

// components
import TextField from 'components/common/TextField';
import WaitingModal from 'components/Bridge/modals/Waiting';

// helpers
import Web3 from 'helpers/web3';
import Contracts from 'helpers/contracts';
import fetchGasPrice from 'helpers/gasprice';
import { validateAmount } from 'helpers/validate';

// styles
import classes from 'pages/Bridge/bridge.module.scss';

// types
import { Coin } from 'types/config';
import { SelectedNetworks } from 'pages/Bridge';
import { ContractAddress } from 'config';
import BN from 'bn.js';

interface BurnStageProps {
  selectedNetworks: SelectedNetworks;
  selectedCoin: Coin;
  nextStage: () => void;
  onSuccess: (hash: string) => void;
}

export default function Burn(props: BurnStageProps) {
  const { selectedNetworks, selectedCoin, nextStage, onSuccess } = props;
  const {
    account,
    connect,
    isConnectedToAllowedNetwork,
    handleTransactionError,
    switchToBSC,
    switchToMatic,
  } = useMetamask();
  const { coins, balance, updateBalance } = useCoin();

  const [txHash, setTxHash] = useState('');
  const [amount, setAmount] = useState(0);
  const isTransactionInProgress = useSwitch();

  const transfer = async () => {
    if (!isConnectedToAllowedNetwork()) return;

    const web3 = Web3.instance;
    const fromNetwork = selectedNetworks.from;
    const connectedNetwork = await web3.eth.net.getId();

    const _maticNetworks = [1, 3, 4];
    if (fromNetwork.symbol === 'matic' && !_maticNetworks.includes(connectedNetwork)) {
      const switchSuccess = await switchToMatic();
      if (!switchSuccess) {
        return toast.error('You are not connected to Matic Network');
      }
    }

    const _bscNetworks = [56, 97];
    if (fromNetwork.symbol === 'bsc' && !_bscNetworks.includes(connectedNetwork)) {
      const switchSuccess = await switchToBSC();
      if (!switchSuccess) {
        return toast.error('Please Switch to Binance Smart Chain Network');
      }
    }

    if (!validateAmount(amount, balance)) return;

    isTransactionInProgress.true();
    if (fromNetwork.symbol === 'matic') {
      await MATICToBSC();
    } else {
      await BSCToMATIC();
    }
  };

  const MATICToBSC = async () => {
    try {
      const web3 = Web3.instance;
      const { MUMBAI_TOKEN, MUMBAI_LOCK } = Contracts.instances;
      const _amount = web3.utils.toWei(amount.toString());
      const gasPrice = await fetchGasPrice();
      const allowance = await MUMBAI_TOKEN.methods.allowance(account, ContractAddress.MUMBAI_LOCK).call();

      if (new BN(_amount).gt(new BN(allowance))) {
        await MUMBAI_TOKEN.methods
          .approve(ContractAddress.MUMBAI_LOCK, _amount)
          .send({ from: account, gasPrice })
          .on('transactionHash', setTxHash);
      }

      const res = await MUMBAI_LOCK.methods
        .lockTokens(_amount)
        .send({ from: account, gasPrice })
        .on('transactionHash', setTxHash);

      onSuccess(res.transactionHash);
      updateBalance();
      setAmount(0);
    } catch (err: any) {
      handleTransactionError(err);
    }
    isTransactionInProgress.false();
  };

  const BSCToMATIC = async () => {
    try {
      const web3 = Web3.instance;
      const { BSC_TOKEN } = Contracts.instances;
      const _amount = web3.utils.toWei(amount.toString());

      const res = await BSC_TOKEN.methods
        .burn(_amount)
        .send({ from: account })
        .on('transactionHash', setTxHash);

      onSuccess(res.transactionHash);
      updateBalance();
      setAmount(0);
    } catch (err: any) {
      handleTransactionError(err);
    }
    isTransactionInProgress.false();
  };

  return (
    <>
      <TextField
        title="Amount"
        type="number"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
        placeholder="Enter Amount"
        min={0}
      />
      <div className={classes.receiveInfo}>
        <p>You will receive ≈ {amount || 0}</p>
        <img src={selectedCoin.icon} alt="" />
        <p> {selectedCoin.symbol}</p>
        <span>{selectedNetworks.to.symbol.toUpperCase()}</span>
      </div>
      <Button className={classes.connectBtnMajor} onClick={account ? transfer : connect}>
        {account ? 'Transfer' : 'Connect Wallet'}
      </Button>
      {account && (
        <p className={classes.link} onClick={nextStage}>
          Already transferred your tokens? Submit the Hash.
        </p>
      )}
      <WaitingModal
        txHash={txHash}
        network={selectedNetworks.from.symbol}
        open={isTransactionInProgress.value}
        title="Transaction in Progress"
        description={`Transferring ${new Intl.NumberFormat().format(amount)} ${coins.selected.symbol}`}
      />
    </>
  );
}
