import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from '../../lib/Link';

const JoinNow = () => {
  return (
    <div className="text-center pt-3">
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            className="p-2 textPrimary"
          >
            Never miss another story!
          </Typography>
          <div>
            <Link color="textPrimary" href="/join" passHref>
              <Button
                variant="contained"
                color="primary"
                className="text-light"
              >
                Join TravelFeed
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinNow;
