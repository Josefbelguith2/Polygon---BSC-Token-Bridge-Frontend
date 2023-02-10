import Modal from '@material-ui/core/Modal';
import classes from './Error.module.scss';
import closeButton from 'assets/icons/close-button.svg';
import colors from 'variables.module.scss';

interface ModalProps {
  isOpen: boolean;
  close: any;
  error: string;
}

export default function ErrorModal(props: ModalProps) {
  const { isOpen, close, error } = props;

  return (
    <Modal
      open={isOpen}
      onClose={close}
      BackdropProps={{
        style: {
          backgroundColor: colors.primaryColor,
          opacity: 0.25,
        },
      }}>
      <div className={classes.paper}>
        <img src={closeButton} alt="X" className={classes.closeBtn} onClick={close} />
        <div className={classes.contentContainer}>
          <h2 className={classes.modalTitle}>Transaction Error</h2>
          <p style={{ marginTop: '20px', marginBottom: '15px', wordBreak: 'break-all' }}>{error}</p>
        </div>
      </div>
    </Modal>
  );
}
