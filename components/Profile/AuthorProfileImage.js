import '@fortawesome/fontawesome-svg-core/styles.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  imgborder: {
    border: `4px solid ${theme.palette.background.default}`,
  },
});

const AuthorProfile = props => {
  const { classes } = props;

  return (
    <img
      src={`https://steemitimages.com/u/${props.user}/avatar/large`}
      alt={props.user}
      width="200"
      height="200"
      className={`rounded-circle p-0 ${classes.imgborder}`}
    />
  );
};

AuthorProfile.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(AuthorProfile);
