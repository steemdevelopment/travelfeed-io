import React, { Component } from "react";
import Link from "next/link";

class LegalNotice extends Component {
  render() {
    return (
      <div className="pt-4 p-2">
        <Link href={`/about`} passHref>
          <a className="text-muted">About</a>
        </Link>
        {"　"}
        <Link href={`/about/faq`} passHref>
          <a className="text-muted">FAQ</a>
        </Link>
        {"　"}
        <Link href={`/about/support-us`} passHref>
          <a className="text-muted">Support Us</a>
        </Link>
        {"　"}
        <Link href={`/about/terms`} passHref>
          <a className="text-muted">Terms</a>
        </Link>
        {"　"}
        <Link href={`/about/privacy`} passHref>
          <a className="text-muted">Privacy</a>
        </Link>
        {"　"}
        <Link href={`/about/cookies`} passHref>
          <a className="text-muted">Cookies</a>
        </Link>
        <p className="text-muted pt-1">
          &copy; {new Date().getFullYear()} TravelFeed
        </p>
      </div>
    );
  }
}

export default LegalNotice;
