import classes from './footer.module.scss';

// assets
import { ReactComponent as linkedin } from 'assets/logos/linkedin.svg';
import { ReactComponent as telegram } from 'assets/logos/telegram.svg';
import { ReactComponent as github } from 'assets/logos/github.svg';

import { app } from 'config';

const links = [
  { Icon: linkedin, link: 'https://www.linkedin.com/in/youssef-belguith-blockchain/' },
  { Icon: github, link: 'https://github.com/Josefbelguith2' },
  { Icon: telegram, link: 'https://t.me/YoussefBelguith' },
];

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.innercontainer}>
        <div className={classes.left}>
          <a className={classes.copyright} href="#" target="_blank" rel="noreferrer">
            {app.company.copyright}
          </a>
        </div>
        <div className={classes.right}>
          {links.map(({ Icon, link }) => (
            <a key={link} href={link} target="_blank" rel="noopener noreferrer">
              <div className={classes.link}>
                <Icon />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
