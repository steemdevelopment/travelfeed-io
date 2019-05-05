import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

class HeaderCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader
          style={{ background: this.props.background }}
          title={
            <Typography
              variant={this.props.titlesize}
              align="center"
              className="p-2 text-light"
            >
              {this.props.title}
            </Typography>
          }
        />
        {this.props.noborder && this.props.content}
        <CardContent>{!this.props.noborder && this.props.content}</CardContent>
      </Card>
    );
  }
}

HeaderCard.defaultProps = {
  titlesize: "h4",
  noborder: false
};

HeaderCard.propTypes = {
  background: PropTypes.string,
  titlesize: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.any,
  noborder: PropTypes.bool
};

export default HeaderCard;
