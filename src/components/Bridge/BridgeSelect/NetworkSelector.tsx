// libraries
import classNames from 'classnames';

// assets
import { ReactComponent as Tick } from 'assets/icons/tick.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/chevron-down.svg';

// styles
import classes from './BridgeSelect.module.scss';

// types
import { Network } from 'types/config';

interface NetworkSelectorProps {
  label: 'to' | 'from';
  options: Network[];
  current: Network;
  setCurrent: (val: Network) => void;
  isDropdownOpen: boolean;
  onDropdownClick: () => void;
}

const NetworkSelector = (props: NetworkSelectorProps) => {
  const { options, label, current, setCurrent, isDropdownOpen, onDropdownClick } = props;
  const { Icon } = current;

  const onSelect = (network: Network) => {
    setCurrent(network);
    onDropdownClick();
  };

  return (
    <div className={classes.select}>
      <h6>{label}</h6>
      <div className={classes.clickable}>
        <div className={classes.current}>
          <Icon className={classes.Icon} />
          <p>{current.name}</p>
        </div>
        <div className={classes.arrow} onClick={onDropdownClick}>
          <ArrowDown className={classNames({ [classes.rotate]: isDropdownOpen })} />
        </div>
        <div className={classNames(classes.dropdown, { [classes.hidden]: !isDropdownOpen })}>
          {options.map((network) => (
            <DropdownNetwork
              key={network.symbol}
              network={network}
              selected={current?.symbol === network.symbol}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DropdownNetworkProps {
  network: Network;
  selected: boolean;
  onSelect: (val: Network) => void;
}

const DropdownNetwork = (props: DropdownNetworkProps) => {
  const onSelect = () => props.onSelect(props.network);
  const { Icon } = props.network;
  return (
    <div className={classes.option} onClick={onSelect}>
      <div className={classes.content}>
        <Icon className={classes.dropdownIcon} />
        <p>{props.network.name}</p>
      </div>
      {props.selected && <Tick />}
    </div>
  );
};

export default NetworkSelector;
