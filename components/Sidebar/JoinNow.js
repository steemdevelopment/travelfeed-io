import React, { Component } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class LegalNotice extends Component {
  render() {
    return (
      <div className="text-center pt-3">
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              gutterBottom={true}
              className="p-2 text-dark"
            >
              Never miss another story!
            </Typography>
            <div>
              <Link as={`/join`} passHref>
                <Button variant="contained" color="primary">
                  Join TravelFeed
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LegalNotice;
