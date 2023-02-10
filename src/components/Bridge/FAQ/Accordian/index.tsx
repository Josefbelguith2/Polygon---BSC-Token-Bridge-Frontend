import { withStyles } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Remove, Add } from '@material-ui/icons';

import classes from './Accordian.module.scss';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    margin: 0,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    padding: 0,
    margin: 0,
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
      marginTop: 10,
      borderBottom: '0',
    },
  },
  content: {
    padding: 0,
    '&$expanded': {
      borderBottom: '0',
      margin: 0,
    },
  },
  expanded: {},
  expandIcon: {
    padding: 0,
    marginRight: 5,
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    paddingLeft: 0,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
  },
}))(MuiAccordionDetails);

interface AccordianProps {
  id: string;
  title: string;
  content: string | undefined;
  expanded: boolean;
  jsx: any;
  onChange: (panel: string) => (event: any, isExpanded: boolean) => void;
}

export default function Accordian(props: AccordianProps) {
  const { id, title, content, expanded, onChange, jsx } = props;
  return (
    <Accordion className={classes.knowMore} expanded={expanded} onChange={onChange(id)}>
      <AccordionSummary
        expandIcon={expanded ? <Remove /> : <Add />}
        style={{ marginBottom: '-1', borderTop: '0px' }}>
        <p className={classes.faqQuestion}>{title}</p>
      </AccordionSummary>
      <AccordionDetails>{jsx ? jsx : <p className={classes.faqContent}>{content}</p>}</AccordionDetails>
    </Accordion>
  );
}
