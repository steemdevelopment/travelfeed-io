import emojiFlags from 'emoji-flags';
import React from 'react';
import BadgeCollection from './BadgeCollection';

const Badges = props => {
  const { countryCodes, regions, budget } = props;

  const countries = [];
  countryCodes.forEach(cc => {
    countries.push(emojiFlags.countryCode(cc.toUpperCase()));
  });
  let regionsVisited = 0;
  regions.forEach(r => {
    if (r.visited) regionsVisited += 1;
  });

  return (
    <>
      <BadgeCollection
        badges={regions}
        title={`Regions visited: ${regionsVisited}`}
      />
      <BadgeCollection
        badges={countries}
        title={`Flags collected: ${countryCodes.length}`}
      />
      <div>Budget score: {budget}</div>
    </>
  );
};

export default Badges;
