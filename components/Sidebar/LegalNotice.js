import React, { Component } from "react";
import Link from "next/link";

class LegalNotice extends Component {
  render() {
    return (
      <div className="pt-4 p-2">
        <Link as={`/about`} passHref>
          <a className="text-muted">About</a>
        </Link>
        {"　"}
        <Link as={`/terms`} passHref>
          <a className="text-muted">Terms</a>
        </Link>
        {"　"}
        <Link as={`/privacy`} passHref>
          <a className="text-muted">Privacy</a>
        </Link>
        {"　"}
        <Link as={`/cookies`} passHref>
          <a className="text-muted">Cookies</a>
        </Link>
        <p className="text-muted">
          &copy; {new Date().getFullYear()} TravelFeed
        </p>
      </div>
    );
  }
}

export default LegalNotice;
