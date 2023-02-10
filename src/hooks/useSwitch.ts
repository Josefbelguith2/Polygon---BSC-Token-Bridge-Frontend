import { useState } from 'react';

export default function useSwitch(initalState = false) {
  const [value, setValue] = useState(initalState);
  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((value) => !value);
  return { value, true: on, false: off, toggle };
}
