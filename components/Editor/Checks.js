import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';

const criteria = [
  { label: 'Only original content' },
  { label: 'At least 250 words' },
  { label: 'Proper sourcing if you are using any media that are not your own' },
  { label: 'Only travel-related content' },
  { label: 'You have slected at least 1 category' },
  {
    label:
      'Your post has a location set. If your post is not about a specific country/region/place (e.g. "What to pack for travelling"), please select  "travel advice" as category',
  },
];

const checks = () => {
  return (
    <FormGroup>
      {criteria.map(c => {
        return <FormControlLabel control={<Checkbox />} label={c.label} />;
      })}
    </FormGroup>
  );
};

export default checks;
