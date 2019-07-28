import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from '../../lib/Link';

const LegalNotice = () => {
  return (
    <div className="pt-4 p-2">
      <Link color="textPrimary" href="/about" passHref>
        <a>
          <Typography
            className="hoverline"
            color="textSecondary"
            variant="subtitle"
            display="inline"
          >
            About
          </Typography>
        </a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/faq" passHref>
        <a>
          <Typography
            className="hoverline"
            color="textSecondary"
            variant="subtitle"
            display="inline"
          >
            FAQ{' '}
          </Typography>
        </a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/support-us" passHref>
        <a>
          <Typography
            className="hoverline"
            color="textSecondary"
            variant="subtitle"
            display="inline"
          >
            Support Us{' '}
          </Typography>
        </a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/terms" passHref>
        <a>
          <Typography
            className="hoverline"
            color="textSecondary"
            variant="subtitle"
            display="inline"
          >
            Terms{' '}
          </Typography>
        </a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/privacy" passHref>
        <a>
          <Typography
            className="hoverline"
            color="textSecondary"
            variant="subtitle"
            display="inline"
          >
            Privacy{' '}
          </Typography>
        </a>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/cookies" passHref>
        <a>
          <Typography
            className="hoverline"
            color="textSecondary"
            variant="subtitle"
            display="inline"
          >
            Cookies{' '}
          </Typography>
        </a>
      </Link>
      <div className="pt-2">
        <Typography color="textSecondary" variant="subtitle" display="inline">
          &copy; {new Date().getFullYear()} TravelFeed
        </Typography>
      </div>
    </div>
  );
};

export default LegalNotice;
