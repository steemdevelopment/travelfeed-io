import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { getLoginURL } from '../../helpers/token';
import Link from '../../lib/Link';

const styles = () => ({
  whitebutton: {
    color: grey[200],
    borderColor: grey[200],
  },
});

const LoginButtons = props => {
  const { classes } = props;
  return (
    <div>
      <Link color="textPrimary" href="/join" passHref>
        <a>
          <Button
            color="secondary"
            variant="contained"
            className={`p-2 ${classes.whitebutton}`}
          >
            Join Now
          </Button>
        </a>
      </Link>
      <a href={getLoginURL}>
        <Button
          color="default"
          // variant="outlined"
          className={`ml-1 p-2 ${classes.whitebutton}`}
        >
          Login
        </Button>
      </a>
    </div>
  );
};

LoginButtons.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(LoginButtons);
