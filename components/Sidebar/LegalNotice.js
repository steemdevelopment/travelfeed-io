import React from 'react';
import Link from '../../lib/Link';

const LegalNotice = () => {
  return (
    <div className="pt-4 p-2">
      <Link color="textPrimary" href="/about" passHref>
        <a className="textSecondary hoverline">About</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/faq" passHref>
        <a className="textSecondary hoverline">FAQ</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/support-us" passHref>
        <a className="textSecondary hoverline">Support Us</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/terms" passHref>
        <a className="textSecondary hoverline">Terms</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/privacy" passHref>
        <a className="textSecondary hoverline">Privacy</a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/cookies" passHref>
        <a className="textSecondary hoverline">Cookies</a>
      </Link>
      <p className="textSecondary pt-1">
        &copy; {new Date().getFullYear()} TravelFeed
      </p>
    </div>
  );
};

export default LegalNotice;
