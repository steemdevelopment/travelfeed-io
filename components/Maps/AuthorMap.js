import { useTheme } from '@material-ui/styles';
import React from 'react';
import { Query } from 'react-apollo';
import { GET_AUTHOR_POST_LOCATIONS } from '../../helpers/graphql/posts';
import MapCluster from './MapCluster';

const AuthorMap = props => {
  const theme = useTheme();

  return (
    <>
      <Query
        query={GET_AUTHOR_POST_LOCATIONS}
        variables={{ author: props.author, limit: Infinity }}
      >
        {({ data }) => {
          const country_codes = [];
          if (data && data.posts) {
            data.posts.forEach(d => {
              if (
                d.country_code &&
                country_codes.indexOf(d.country_code) === -1
              )
                country_codes.push(d.country_code);
            });
            return (
              <div style={{ height: '450px' }} className="w-100">
                <MapCluster
                  scrollZoom={false}
                  showControls={false}
                  position="relative"
                  height="450px"
                  className="w-100 h-100"
                  data={data.posts}
                  dark={theme.palette.type === 'dark'}
                />
              </div>
            );
          }
          return <></>;
        }}
      </Query>
    </>
  );
};

export default AuthorMap;
