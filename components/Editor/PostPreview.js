import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

class PostPreview extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="contained"
          color="secondary"
          autoFocus
        >
          Preview
        </Button>
        <Dialog
          fullWidth
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          asdsadds
        </Dialog>
      </div>
    );
  }
}

export default PostPreview;
