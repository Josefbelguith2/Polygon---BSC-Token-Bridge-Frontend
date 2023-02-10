import { useState } from 'react';

export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const set = (e: any) => setValue(e.target.value);
  const override = (v: string) => setValue(v);
  const reset = () => setValue('');
  return { value, set, reset, override };
}
