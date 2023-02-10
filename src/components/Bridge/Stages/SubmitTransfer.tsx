// hooks
import useSwitch from 'hooks/useSwitch';

// contexts
import { useMetamask } from 'contexts/Metamask';
import useInput from 'hooks/useInput';

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

interface SubmitTransferStageProps {
  selectedCoin: Coin;
  selectedNetworks: SelectedNetworks;
  hash: string;
  prevStage: () => void;
}

export default function SubmitTransfer(props: SubmitTransferStageProps) {
  const { selectedNetworks, selectedCoin, hash, prevStage } = props;
  const { account, refresh } = useMetamask();

  const transferHash = useInput(hash);
  const isTransactionInProgress = useSwitch();

  const submitTransferHash = async () => {
    isTransactionInProgress.true();
    const fromNetwork: 'matic' | 'bsc' = selectedNetworks.from.symbol;
    const { success } = await api.transfer(selectedCoin.url, {
      network: fromNetwork,
      transferHash: transferHash.value,
      userAddress: account,
    });
    if (success) toast.success('Transfer Hash Submitted Successfully');
    isTransactionInProgress.false();
    refresh.rerender();
  };

  return (
    <>
      <TextField
        title="Transfer Hash"
        type="text"
        value={transferHash.value}
        onChange={transferHash.set}
        inputClassName={classes.hashInput}
      />
      <Button
        className={classes.connectBtnMajor}
        onClick={submitTransferHash}
        disabled={isTransactionInProgress.value}>
        Submit Transfer Hash
      </Button>
      {account && (
        <p className={classes.link} onClick={prevStage}>
          Didn't transfer your tokens yet?
        </p>
      )}
      <WaitingModal
        txHash={transferHash.value}
        network={selectedNetworks.from.symbol}
        open={isTransactionInProgress.value}
        title="Submitting Transfer Hash"
        description={transferHash.value}
      />
    </>
  );
}
