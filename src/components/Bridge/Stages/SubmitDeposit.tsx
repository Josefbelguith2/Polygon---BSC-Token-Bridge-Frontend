// hooks
import useInput from 'hooks/useInput';
import useSwitch from 'hooks/useSwitch';

// contexts
import { useMetamask } from 'contexts/Metamask';

// libraries
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';

// components
import TextField from 'components/common/TextField';
import WaitingModal from 'components/Bridge/modals/Waiting';

// helpers
import api from 'api';

// styles
import classes from 'pages/Bridge/bridge.module.scss';

// types
import { SelectedNetworks } from 'pages/Bridge';
import { Coin } from 'types/config';

interface SubmitDepositStageProps {
  selectedCoin: Coin;
  selectedNetworks: SelectedNetworks;
  hash: string;
  prevStage: () => void;
}

export default function SubmitFee(props: SubmitDepositStageProps) {
  const { selectedNetworks, selectedCoin, hash, prevStage } = props;
  const { account, refresh } = useMetamask();
  const depositHash = useInput(hash);
  const isTransactionInProgress = useSwitch();

  const submitDepositHash = async () => {
    isTransactionInProgress.true();
    const fromNetwork: 'matic' | 'bsc' = selectedNetworks.from.symbol;
    const { success } = await api.deposit(selectedCoin.url, {
      network: fromNetwork,
      depositHash: depositHash.value,
      userAddress: account,
    });
    if (success) toast.success('Deposit Hash Submitted Successfully');
    isTransactionInProgress.false();
    refresh.rerender();
  };

  return (
    <>
      <TextField
        title="Deposit Hash"
        type="text"
        value={depositHash.value}
        onChange={depositHash.set}
        inputClassName={classes.hashInput}
      />
      <Button className={classes.connectBtnMajor} onClick={submitDepositHash}>
        Submit Deposit Hash
      </Button>
      {account && (
        <p className={classes.link} onClick={prevStage}>
          Didn't Deposit your tokens yet?
        </p>
      )}
      <WaitingModal
        txHash={depositHash.value}
        network={selectedNetworks.to.symbol}
        open={isTransactionInProgress.value}
        title="Submitting Deposit Hash"
        description={depositHash.value}
      />
    </>
  );
}
