import { ReactNode, useState } from 'react';
import { Grid } from '@material-ui/core';
import Accordian from 'components/Bridge/FAQ/Accordian';
import classes from './faq.module.scss';
import data from './data';

interface FAQInterface {
  children?: ReactNode;
}

export default function FAQ({ children }: FAQInterface) {
  const [expanded, setExpanded] = useState<string | false>(data[0].id);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid className={classes.faqSection} xs={12} sm={5} item>
      <div className={classes.mainSection}>
        <p className={classes.title}>FAQ</p>
        <div className={classes.scrollable}>
          {data.map((faq) => (
            <Accordian
              key={faq.id}
              id={faq.id}
              title={faq.title}
              content={faq.content}
              jsx={faq.jsx}
              expanded={expanded === faq.id}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
      <div>{children}</div>
    </Grid>
  );
}
