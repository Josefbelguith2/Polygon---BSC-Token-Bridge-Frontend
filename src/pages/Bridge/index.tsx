import { useState, useMemo } from 'react';

// hooks
import useStage from 'hooks/useStage';
import useEffectAsync from 'hooks/useEffectAsync';
import useSwitch from 'hooks/useSwitch';

// contexts
import { useMetamask } from 'contexts/Metamask';
import { useCoin } from 'contexts/Coins';

// libraries
import { toast } from 'react-toastify';

// components
import SplitCard from 'components/Bridge/SplitCard';
import BridgeSelect from 'components/Bridge/BridgeSelect';
import Transfer from 'components/Bridge/Stages/Transfer';
import Deposit from 'components/Bridge/Stages/Deposit';
import SubmitTransfer from 'components/Bridge/Stages/SubmitTransfer';
import SubmitDeposit from 'components/Bridge/Stages/SubmitDeposit';
import WaitingModal from 'components/Bridge/modals/Waiting';

// styles
import classes from './bridge.module.scss';
import colors from '../../variables.module.scss';

// helpers
import api from 'api';

// config
import { app, networks } from 'config';

// types
import { Network } from 'types/config';

enum STAGE {
  TRANSFER = 'transfer',
  SUBMIT_TRANSFER = 'submit-transfer',
  DEPOSIT = 'deposit',
  SUBMIT_DEPOSIT = 'submit-deposit',
}

export interface SelectedNetworks {
  from: Network;
  to: Network;
}

export default function Bridge() {
  const { account, refresh, addBSCToWallet } = useMetamask();
  const { coins, balance, addTokenToWallet } = useCoin();
  const [status, setStatus] = useState<any>();

  const stage = useStage({ stages: STAGE, initial: STAGE.TRANSFER });

  const [selectedNetworks, setSelectedNetworks] = useState<SelectedNetworks>({
    from: networks[0],
    to: networks[1],
  });

  const [transferHash, setTransferHash] = useState('');
  const [depositHash, setDepositHash] = useState('');

  const isSubmitTransferInProgress = useSwitch();
  const isSubmitDepositInProgress = useSwitch();

  const onTransferSuccess = async (hash: string) => {
    setTransferHash(hash);
    isSubmitTransferInProgress.true();
    const fromNetwork: 'matic' | 'bsc' = selectedNetworks.from.symbol;
    const { success } = await api.transfer(coins.selected.url, {
      network: fromNetwork,
      transferHash: hash,
      userAddress: account,
    });
    if (success) toast.success('Transfer Hash Submitted Successfully');
    isSubmitTransferInProgress.false();
    refresh.rerender();
  };

  const onDepositSuccess = async (hash: string) => {
    setDepositHash(hash);
    isSubmitDepositInProgress.true();
    const fromNetwork: 'matic' | 'bsc' = selectedNetworks.from.symbol;
    const { success } = await api.deposit(coins.selected.url, {
      network: fromNetwork,
      depositHash: hash,
      userAddress: account,
    });
    if (success) toast.success('Deposit Hash Submitted Successfully');
    isSubmitDepositInProgress.false();
    refresh.rerender();
  };

  useEffectAsync(async () => {
    if (!account) return;
    const fromNetwork = selectedNetworks.from.symbol;
    const { response } = await api.status(coins.selected.url, {
      userAddress: account,
      network: fromNetwork,
    });
    setStatus(response);
    switch (response?.transactionStage) {
      case STAGE.TRANSFER:
        return stage.set.TRANSFER();

      case STAGE.DEPOSIT:
        return stage.set.DEPOSIT();

      default:
        return stage.set.TRANSFER();
    }
  }, [account, selectedNetworks.from, coins.selected, refresh.triggerValue]);

  const content = useMemo(() => {
    switch (stage.current) {
      case STAGE.TRANSFER:
        return (
          <Transfer
            selectedCoin={coins.selected}
            selectedNetworks={selectedNetworks}
            nextStage={stage.set.SUBMIT_TRANSFER}
            onSuccess={onTransferSuccess}
          />
        );

      case STAGE.SUBMIT_TRANSFER:
        return (
          <SubmitTransfer
            hash={transferHash}
            selectedCoin={coins.selected}
            selectedNetworks={selectedNetworks}
            prevStage={stage.set.TRANSFER}
          />
        );

      case STAGE.DEPOSIT:
        return (
          <Deposit
            status={status}
            selectedNetworks={selectedNetworks}
            nextStage={stage.set.SUBMIT_DEPOSIT}
            onSuccess={onDepositSuccess}
            method={coins.selected.method}
          />
        );

      case STAGE.SUBMIT_DEPOSIT:
        return (
          <SubmitDeposit
            hash={depositHash}
            selectedCoin={coins.selected}
            selectedNetworks={selectedNetworks}
            prevStage={stage.set.DEPOSIT}
          />
        );
    }
  }, [stage]);

  const underFaqContent = useMemo(() => {
    return (
      <>
        <p className={classes.underFaqContent}>
          Add Binance Smart Chain to your wallet{' '}
          <span style={{ color: colors.primaryColor, cursor: 'pointer' }} onClick={addBSCToWallet}>
            Click here
          </span>
        </p>
        <p className={classes.underFaqContent}>
          Add {app.company.token} token to your wallet{' '}
          <span style={{ color: colors.primaryColor, cursor: 'pointer' }} onClick={addTokenToWallet}>
            Click here
          </span>
        </p>
      </>
    );
  }, []);

  return (
    <>
      <SplitCard
        page="Bridge"
        description={`Bridge ${app.company.token} from Matic Network (MATIC) to Binance Smart Chain (BSC)`}
        tooltip={`Connect your wallet to Bridge ${app.company.token} from MATIC to BSC and vice versa.`}
        underFaq={underFaqContent}>
        <BridgeSelect options={networks} current={selectedNetworks} setCurrent={setSelectedNetworks} />
        <p className={classes.availableBalance}>
          Available Balance: {balance} {coins.selected.symbol}
        </p>
        {content}
      </SplitCard>
      <WaitingModal
        txHash={transferHash}
        network={selectedNetworks.from.symbol}
        open={isSubmitTransferInProgress.value}
        title="Submitting Transfer Hash"
        description={transferHash}
      />
      <WaitingModal
        txHash={depositHash}
        network={selectedNetworks.to.symbol}
        open={isSubmitDepositInProgress.value}
        title="Submitting Deposit Hash"
        description={depositHash}
      />
    </>
  );
}
