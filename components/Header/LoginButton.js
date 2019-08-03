import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { getLoginURL } from '../../helpers/token';

const styles = () => ({
  whitebutton: {
    color: grey[200],
    borderColor: grey[200],
  },
});

const LoginButton = props => {
  const { classes } = props;
  return (
    <a href={getLoginURL}>
      <Button color="default" className={`ml-1 p-2 ${classes.whitebutton}`}>
        Login
      </Button>
    </a>
  );
};

LoginButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(LoginButton);
