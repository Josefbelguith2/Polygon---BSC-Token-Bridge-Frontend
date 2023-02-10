import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import classes from './Waiting.module.scss';
import colors from 'variables.module.scss';

interface ModalProps {
  open: boolean;
  title: string;
  description: string;
  network?: string;
  txHash?: string;
}

export default function WaitingModal(props: ModalProps) {
  const { open, title, description, network, txHash } = props;

  const onViewTransaction = () => {
    switch (network) {
      case 'matic':
        window.open(`https://polygonscan.com/tx/${txHash}`);
        break;
      case 'bsc':
        window.open(`https://bscscan.com/tx/${txHash}`);
        break;
    }
  };

  return (
    <Modal
      open={open}
      BackdropProps={{
        style: {
          backgroundColor: colors.primaryColor,
          opacity: 0.25,
        },
      }}>
      <div className={classes.modal}>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.description}>{description}</p>
        {txHash && (
          <Button className={classes.btn} onClick={onViewTransaction}>
            View Transaction on Explorer
          </Button>
        )}
      </div>
    </Modal>
  );
}
