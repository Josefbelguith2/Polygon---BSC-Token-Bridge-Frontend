import { toast } from 'react-toastify';

export const validateAmount = (amount: number, balance: number) => {
  if (isNaN(amount) || amount < 0) {
    toast.error('Enter a valid amount');
    return false;
  }

  if (amount < 1) {
    toast.error('Enter Non Zero Amount');
    return false;
  }

  if (balance < amount) {
    toast.error('Insufficient Balance');
    return false;
  }

  return true;
};
