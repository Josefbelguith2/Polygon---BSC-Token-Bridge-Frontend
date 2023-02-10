// hooks
import { useState } from 'react';
import { useMetamask } from 'contexts/Metamask';
import useSwitch from 'hooks/useSwitch';

// libraries
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';

// hooks
import { useCoin } from 'contexts/Coins';

// components
import WaitingModal from 'components/Bridge/modals/Waiting';

// helpers
import Web3 from 'helpers/web3';
import Contracts from 'helpers/contracts';

// styles
import classes from 'pages/Bridge/bridge.module.scss';

// types
import { SelectedNetworks } from 'pages/Bridge';

interface DepositStageProps {
  selectedNetworks: SelectedNetworks;
  status: any;
  nextStage: () => void;
  onSuccess: (hash: string) => void;
  method: 'burn' | 'lock';
}

export default function Deposit(props: DepositStageProps) {
  const { selectedNetworks, status, nextStage, onSuccess } = props;
  const { account, isConnectedToAllowedNetwork, handleTransactionError, switchToBSC, switchToMatic } =
    useMetamask();

  const { coins, updateBalance } = useCoin();
  const [txHash, setTxHash] = useState<string>();
  const isTransactionInProgress = useSwitch();

  const deposit = async () => {
    if (!isConnectedToAllowedNetwork()) return;

    const web3 = Web3.instance;
    const fromNetwork = selectedNetworks.from;
    const connectedNetwork = await web3.eth.net.getId();

    const _maticNetworks = [137, 80001];
    const _bscNetworks = [56, 97];

    if (fromNetwork.symbol === 'matic' && !_bscNetworks.includes(connectedNetwork)) {
      const switchSuccess = await switchToBSC();
      if (!switchSuccess) {
        return toast.error('Please Switch to Binance Smart Chain Network');
      }
    }

    if (fromNetwork.symbol === 'bsc' && !_maticNetworks.includes(connectedNetwork)) {
      const switchSuccess = await switchToMatic();
      if (!switchSuccess) {
        return toast.error('You are not connected to Matic Network');
      }
    }

    isTransactionInProgress.true();
    if (fromNetwork.symbol === 'matic') {
      await MATICToBSC();
    } else {
      await BSCToMATIC();
    }
  };

  const MATICToBSC = async () => {
    try {
      const { BSC_BRIDGE } = Contracts.instances;
      const { functionSignature, r, s, v } = status.depositSignature;
      const res = await BSC_BRIDGE.methods
        .executeMetaTransaction(functionSignature, r, s, v)
        .send({ from: account })
        .on('transactionHash', setTxHash);
      onSuccess(res.transactionHash);
      updateBalance();
    } catch (err: any) {
      handleTransactionError(err);
    }
    isTransactionInProgress.false();
  };

  const BSCToMATIC = async () => {
    try {
      const { MUMBAI_LOCK } = Contracts.instances;
      const { functionSignature, r, s, v } = status.depositSignature;

      const res = await MUMBAI_LOCK.methods
        .executeMetaTransaction(functionSignature, r, s, v)
        .send({ from: account })
        .on('transactionHash', setTxHash);

      onSuccess(res.transactionHash);
      updateBalance();
      nextStage();
    } catch (err: any) {
      handleTransactionError(err);
    }
    isTransactionInProgress.false();
  };

  return (
    <>
      <Button className={classes.connectBtnMajor} onClick={deposit}>
        Deposit Tokens
      </Button>
      {account && (
        <p className={classes.link} onClick={nextStage}>
          Already Deposited? Submit the Deposit Hash to start a new transaction.
        </p>
      )}
      <WaitingModal
        txHash={txHash}
        network={selectedNetworks.to.symbol}
        open={isTransactionInProgress.value}
        title="Deposit Transaction in Progress"
        description={`Depositing ${new Intl.NumberFormat().format(parseFloat(status?.amount) / 1e18)} ${
          coins.selected.symbol
        }`}
      />
    </>
  );
}
