import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import parseBody from '../../helpers/parseBody';
import { getUser } from '../../helpers/token';
import PostContent from '../Post/PostContent';
import PostImageHeader from '../Post/PostImageHeader';
import PostTitle from '../Post/PostTitle';

const HtmlEditorPreview = props => {
  let htmlBody = { __html: <br /> };
  if (props.content && props.content.length > 1) {
    htmlBody = { __html: parseBody(props.content, { lazy: false }) };
  }
  const bodyText = { __html: htmlBody };
  return (
    <div>
      {props.img_url && <PostImageHeader backgroundImage={props.img_url} />}
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item lg={7} md={8} sm={11} xs={12} className="pb-4">
          <div style={{ height: '250px' }}>
            <PostImageHeader backgroundImage="https://steemitimages.com/p/4PYjjVwJ1UdticstL9DgnpDwqCrx31YQyB1X2ZTjSL6gW6cb3gf6mzkwLz3LPhDcWE5VY1cojemPgtN4e8MpGfuMamsEup19YKzABTubuwC/?format=match&width=1800&mode=fit" />
            <PostTitle title={props.title} />
          </div>
          <Card>
            <PostContent
              author={getUser()}
              permlink={props.permlink}
              display_name={getUser()}
              created_at={Date.now()}
              readtime={props.readtime}
              content={
                <div
                  className="textPrimary postcontent"
                  dangerouslySetInnerHTML={htmlBody}
                />
              }
              latitude={props.latitude}
              longitude={props.longitude}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

HtmlEditorPreview.defaultProps = {
  preview: '',
};

HtmlEditorPreview.propTypes = {
  preview: PropTypes.string,
};

export default HtmlEditorPreview;
