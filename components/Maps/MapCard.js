import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default class MapCard extends PureComponent {
  render() {
    return (
      <div>
        <div>
          <Link
            as={`/@${this.props.info.author}/${this.props.info.permlink}`}
            href={`/post?author=${this.props.info.author}&permlink=${
              this.props.info.permlink
            }`}
            passHref
          >
            <a>{this.props.info.title}</a>
          </Link>
          <br />
          <em>
            by{" "}
            <Link
              as={`/@${this.props.info.author}`}
              href={`/blog?author=${this.props.info.author}`}
              passHref
            >
              <a>@{this.props.info.author}</a>
            </Link>
          </em>
        </div>
      </div>
    );
  }
}

MapCard.propTypes = {
  info: PropTypes.object
};
