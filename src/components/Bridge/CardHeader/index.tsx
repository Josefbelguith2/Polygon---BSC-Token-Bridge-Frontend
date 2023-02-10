import { Tooltip } from '@material-ui/core';
import classes from './carddheader.module.scss';
import infoIcon from 'assets/icons/info.svg';
import { app } from 'config';

interface PageHeadInterface {
  page?: string;
  tooltip?: string;
  description?: string;
}

export default function CardHeader({ page, tooltip = '', description }: PageHeadInterface) {
  return (
    <>
      <div className={classes.cardHeader}>
        <div className={classes.logoGroup}>
          <h3>{app.company.name} </h3>
        </div>
        <Tooltip title={tooltip}>
          <img src={infoIcon} alt="info icon" />
        </Tooltip>
      </div>

      <p className={classes.info}>{description}</p>
    </>
  );
}
