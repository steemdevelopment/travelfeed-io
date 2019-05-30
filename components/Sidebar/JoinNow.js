import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';

const JoinNow = () => {
  return (
    <div className="text-center pt-3">
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            className="p-2 text-dark"
          >
            Never miss another story!
          </Typography>
          <div>
            <Link href="/join" passHref>
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
