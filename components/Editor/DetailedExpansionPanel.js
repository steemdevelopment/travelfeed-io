import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import HelpTooltip from '../Editor/HelpTooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const DetailedExpansionPanel = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={props.expanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={`pl-3 ${classes.column}`}>
            <Typography variant="h6">{props.title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {props.value}
            </Typography>
          </div>
          <div className={`pr-3 d-xl-none d-lg-none ${classes.column}`}>
            <HelpTooltip title={props.helper} />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className="container-fluid">
            <div className="row">
              <div
                className={`${
                  props.fullWidth ? 'col-12' : 'col-xl-8 col-lg-9'
                }`}
              >
                {props.selector}
              </div>
              {!props.fullWidth && (
                <div
                  className={`col-none col-xl-4 col-lg-3 ${clsx(
                    classes.column,
                    classes.helper,
                  )}`}
                >
                  <Typography variant="caption">
                    {props.description}
                    <br />
                    <Tooltip title={props.helper}>
                      <span>Learn more</span>
                    </Tooltip>
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

DetailedExpansionPanel.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  expanded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
  helper: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DetailedExpansionPanel;
