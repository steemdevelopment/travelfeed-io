import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import DestinationsIcon from '@material-ui/icons/Explore';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { popularCountries, slugFromCC } from '../../helpers/countryCodes';
import PopupNav from '../Header/HeaderPopupNav';

const styles = () => ({
  whitebutton: {
    color: grey[200],
  },
});

class DestinationsNav extends Component {
  state = {
    random: undefined,
    showDest: false,
  };

  closeDest = () => {
    this.setState({ showDest: false });
  };

  newRandom = () => {
    this.setState({ random: undefined });
    this.toggleDest();
  };

  toggleDest() {
    this.setState(state => ({ showDest: !state.showDest }));
  }

  render() {
    const { classes } = this.props;
    if (this.state.random === undefined) {
      const randomCountry =
        popularCountries[Math.floor(Math.random() * popularCountries.length)];
      this.setState({ random: slugFromCC(randomCountry) });
    }
    return (
      <Fragment>
        <ClickAwayListener onClickAway={this.closeDest}>
          <div>
            {(this.props.isSmall && (
              <IconButton
                className="text-light p-2"
                onClick={() => this.toggleDest()}
              >
                <DestinationsIcon />
              </IconButton>
            )) || (
              <Button
                color="default"
                className={classes.whitebutton}
                onClick={() => this.toggleDest()}
              >
                Destinations <DownIcon />
              </Button>
            )}
            <PopupNav
              showDest={this.state.showDest}
              closeDest={this.closeDest}
            />
          </div>
        </ClickAwayListener>
      </Fragment>
    );
  }
}

DestinationsNav.defaultProps = {
  isSmall: false,
};

DestinationsNav.propTypes = {
  isSmall: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DestinationsNav);
