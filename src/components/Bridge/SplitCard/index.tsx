import { ReactNode } from 'react';

// libraries
import { Grid } from '@material-ui/core';

// components
import FAQ from 'components/Bridge/FAQ';
import CardHeader from 'components/Bridge/CardHeader';

// styles
import classes from './splitcard.module.scss';

interface SplitPageProps {
  children?: ReactNode;
  underFaq?: ReactNode;
  page?: string;
  tooltip?: string;
  description?: string;
}

export default function SplitCard(props: SplitPageProps) {
  const { children, underFaq, page, tooltip, description } = props;
  return (
    <Grid className={classes.contentContainer} container>
      <FAQ>{underFaq}</FAQ>
      <Grid className={classes.contentOperation} xs={12} sm={7} item>
        <CardHeader page={page} description={description} tooltip={tooltip} />
        {children}
      </Grid>
    </Grid>
  );
}
