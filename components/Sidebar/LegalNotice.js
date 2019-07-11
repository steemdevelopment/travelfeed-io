import React from 'react';
import Link from '../../lib/Link';

const LegalNotice = () => {
  return (
    <div className="pt-4 p-2">
      <Link color="textPrimary" href="/about" passHref>
        <a className="textSecondary">About</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/faq" passHref>
        <a className="textSecondary">FAQ</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/support-us" passHref>
        <a className="textSecondary">Support Us</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/terms" passHref>
        <a className="textSecondary">Terms</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/privacy" passHref>
        <a className="textSecondary">Privacy</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/cookies" passHref>
        <a className="textSecondary">Cookies</a>
      </Link>
      <p className="textSecondary pt-1">
        &copy; {new Date().getFullYear()} TravelFeed
      </p>
    </div>
  );
};

export default LegalNotice;
