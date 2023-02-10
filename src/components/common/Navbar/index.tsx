// hooks
import { useMetamask } from 'contexts/Metamask';
import { useLocation } from 'react-router';

// libraries
import classnames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';

// styles
import classes from './navbar.module.scss';

// assets
import Logo from 'assets/logos/Logo.png';
import { app } from 'config';

interface Link {
  label: string;
  path: string;
  comingSoon: boolean;
}

const links: Link[] = [];

const Navbar = () => {
  let location = useLocation();
  const { account, connect, disconnect } = useMetamask();

  return (
    <nav className={classes.navbar}>
      <div className={classes.logoGroup}>
        <img src={Logo} className={classes.logo} alt={`${app.company.name} Logo`} />
        <div className={classes.logoText}>
          <h1 className={classes.title}>{app.company.name}</h1>
        </div>
      </div>

      <div className={classes.navLinks}>
        {links.map((link) =>
          !link.comingSoon ? (
            <RouterLink
              key={link.label}
              to={link.path}
              className={classnames(classes.navLink, {
                [classes.active]: location.pathname === link.path,
              })}>
              {link.label}
            </RouterLink>
          ) : (
            <Tooltip key={link.label} title={link.comingSoon ? 'Coming Soon' : ''}>
              <span className={classnames(classes.navLink, classes.disabled)}>{link.label}</span>
            </Tooltip>
          ),
        )}
      </div>
      <div className={classes.right}>
        {account && (
          <p className={classes.account}>
            {account.substr(0, 7)}...{account.substr(account.length - 7, account.length - 1)}
          </p>
        )}
        <Button className={classes.btn} onClick={account ? disconnect : connect}>
          <div className={classes.btnText}>{account ? 'Disconnect' : 'Connect Wallet'}</div>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
