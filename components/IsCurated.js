import React, { Fragment, Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import CurateIcon from "@material-ui/icons/Star";
import HonourIcon from "@material-ui/icons/StarHalf";
import NotCuratedIcon from "@material-ui/icons/StarBorder";
import ShortIcon from "@material-ui/icons/ShortText";
import LanguageIcon from "@material-ui/icons/Language";
import CopyrightIcon from "@material-ui/icons/Copyright";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { customJson } from "../utils/actions";
import { withSnackbar } from "notistack";
import { getUser } from "../utils/token";

const styles = {
  green: {
    backgroundColor: green[100],
    color: green[600]
  },
  red: {
    backgroundColor: red[100],
    color: red[600]
  }
};
class SimpleDialog extends React.Component {
  state = {
    author: this.props.author,
    permlink: this.props.permlink,
    confirm_open: false,
    action: null
  };

  handleConfirmClose = () => {
    this.setState({ confirm_open: false });
  };
  newNotification(notification) {
    if (notification != undefined) {
      const text = notification[0];
      const variant = notification[1];
      this.props.enqueueSnackbar(text, { variant });
    }
  }

  handleListItemClick = action => {
    this.setState({ confirm_open: true, action: action });
  };

  handleConfirm = () => {
    this.setState({ confirm_open: false });
    let payload = {
      author: this.state.author,
      permlink: this.state.permlink,
      action: this.state.action
    };
    customJson(payload).then(result => {
      this.newNotification(result);
    });
    this.props.onClose();
  };

  render() {
    const { classes, ...other } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.confirm_open}
          onClose={this.handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Perform curation operation '" + this.state.action + "'?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to perform the curation action{" "}
              <i>{this.state.action}</i> on this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <DialogTitle id="simple-dialog-title">Curation Actions</DialogTitle>
          <div>
            <List>
              <ListItem
                button
                onClick={() => this.handleListItemClick("curate")}
              >
                <ListItemAvatar>
                  <Avatar className={classes.green}>
                    <CurateIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Curate Post" />
              </ListItem>
              <ListItem
                button
                onClick={() => this.handleListItemClick("honour")}
              >
                <ListItemAvatar>
                  <Avatar className={classes.green}>
                    <HonourIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Honour Post" />
              </ListItem>
              <ListItem
                button
                onClick={() => this.handleListItemClick("short")}
              >
                <ListItemAvatar>
                  <Avatar className={classes.red}>
                    <ShortIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Too short" />
              </ListItem>
            </List>
            <ListItem
              button
              onClick={() => this.handleListItemClick("language")}
            >
              <ListItemAvatar>
                <Avatar className={classes.red}>
                  <LanguageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Not in English" />
            </ListItem>

            <ListItem
              button
              onClick={() => this.handleListItemClick("copyright")}
            >
              <ListItemAvatar>
                <Avatar className={classes.red}>
                  <CopyrightIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Violates copyright" />
            </ListItem>
          </div>
        </Dialog>
      </div>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

const SimpleDialogWrapped = withStyles(styles)(withSnackbar(SimpleDialog));

class IsCurated extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const user = getUser();
    const curatorlist = [
      "for91days",
      "guchtere",
      "mrprofessor",
      "jpphotography",
      "elsaenroute",
      "smeralda"
    ];
    let isCurator = false;
    if (curatorlist.includes(user)) {
      isCurator = true;
    }
    let dialog = <Fragment />;
    if (isCurator) {
      dialog = (
        <div>
          <div>
            <SimpleDialogWrapped
              open={this.state.open}
              onClose={this.handleClose}
              author={this.props.author}
              permlink={this.props.permlink}
            />
          </div>
        </div>
      );
    }
    if (this.props.curation_score > 8000) {
      return (
        <Fragment>
          <IconButton>
            <CurateIcon onClick={this.handleClickOpen} />
          </IconButton>
          {dialog}
        </Fragment>
      );
    } else if (this.props.curation_score > 4000) {
      return (
        <Fragment>
          <IconButton>
            <HonourIcon onClick={this.handleClickOpen} />
          </IconButton>
          {dialog}
        </Fragment>
      );
    }
    if (isCurator) {
      return (
        <Fragment>
          <IconButton>
            <NotCuratedIcon onClick={this.handleClickOpen} />
          </IconButton>
          {dialog}
        </Fragment>
      );
    }
    return <Fragment />;
  }
}

IsCurated.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  votes: PropTypes.object
};

export default IsCurated;
