import React, { Component, Fragment } from "react";
import { slugFromCC, popular_countries } from "../../helpers/country_codes";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PropTypes from "prop-types";
import DestinationsIcon from "@material-ui/icons/Explore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DownIcon from "@material-ui/icons/ArrowDropDown";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import PopupNav from "./PopupNav";

const styles = () => ({
  whitebutton: {
    color: grey[200]
  }
});

class DestinationsNav extends Component {
  state = {
    selection: undefined,
    random: undefined,
    showDest: false
  };
  toggleDest() {
    this.setState(state => ({ showDest: !state.showDest }));
  }
  closeDest() {
    this.setState({ showDest: false });
  }
  onMenuClick = selection => {
    this.setState({ selection });
  };
  newRandom = () => {
    this.setState({ random: undefined });
    this.toggleDest();
  };
  render() {
    const { classes } = this.props;
    if (this.state.random === undefined) {
      const random_country =
        popular_countries[Math.floor(Math.random() * popular_countries.length)];
      this.setState({ random: slugFromCC(random_country) });
    }
    return (
      <Fragment>
        <ClickAwayListener onClickAway={this.closeDest.bind(this)}>
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
              closeDest={this.closeDest.bind(this)}
            />
          </div>
        </ClickAwayListener>
      </Fragment>
    );
  }
}

DestinationsNav.defaultProps = {
  isSmall: false
};

DestinationsNav.propTypes = {
  isSmall: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DestinationsNav);
