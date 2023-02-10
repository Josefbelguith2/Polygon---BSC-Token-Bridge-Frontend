import { useState, useRef, useEffect } from 'react';
import { toast, TypeOptions } from 'react-toastify';

export default function usePersistentToast(message = '', type: TypeOptions = 'default') {
  const [persistentToastID, setPersistentToastID] = useState<React.ReactText>();
  const persistentToastIDRef = useRef<React.ReactText>();

  useEffect(() => {
    persistentToastIDRef.current = persistentToastID;
  }, [persistentToastID]);

  const trigger = () => {
    toast.dismiss(persistentToastIDRef.current);
    let toastID = toast(message, {
      type: type,
      autoClose: false,
      closeButton: false,
    });
    setPersistentToastID(toastID);
    return;
  };

  const dismiss = () => {
    setPersistentToastID(undefined);
    toast.dismiss(persistentToastIDRef.current);
    persistentToastIDRef.current = undefined;
    return;
  };

  return { trigger, dismiss };
}
