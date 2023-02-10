import { useEffect } from 'react';

const useEffectAsync = (effect: () => Promise<any>, deps: any[] = []) => {
  useEffect(() => {
    effect();
  }, deps);
};

export default useEffectAsync;
