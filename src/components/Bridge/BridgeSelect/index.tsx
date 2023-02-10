import React, { useState } from 'react';
import NetworkSelector from './NetworkSelector';
import { ReactComponent as ArrowRight } from 'assets/icons/right-arrow.svg';
import classes from './BridgeSelect.module.scss';
import { Network } from 'types/config';

interface BridgeSelectProps {
  options: Network[];
  current: { from: Network; to: Network };
  setCurrent: React.Dispatch<React.SetStateAction<{ from: Network; to: Network }>>;
}

export default function BridgeSelect(props: BridgeSelectProps) {
  const { options, current, setCurrent } = props;

  const [dropdownStage, setDropdownStage] = useState<'from' | 'to' | undefined>();
  const onFromDropdownClick = () => setDropdownStage((current) => (current === 'from' ? undefined : 'from'));
  const onToDropdownClick = () => setDropdownStage((current) => (current === 'to' ? undefined : 'to'));

  const setFrom = (val: Network) => setCurrent((current) => ({ ...current, from: val }));
  const setTo = (val: Network) => setCurrent((current) => ({ ...current, to: val }));
  const swap = () => setCurrent({ from: current.to, to: current.from });

  return (
    <div className={classes.pc}>
      <NetworkSelector
        label="from"
        options={options}
        current={current.from}
        setCurrent={setFrom}
        isDropdownOpen={dropdownStage === 'from'}
        onDropdownClick={onFromDropdownClick}
      />
      <ArrowRight onClick={swap} />
      <NetworkSelector
        label="to"
        options={options}
        current={current.to}
        setCurrent={setTo}
        isDropdownOpen={dropdownStage === 'to'}
        onDropdownClick={onToDropdownClick}
      />
    </div>
  );
}
