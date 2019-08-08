import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { invalidPermlink } from '../../helpers/regex';

const PermlinkInput = props => {
  const handleChange = () => event => {
    props.onChange(event.target.value.toLowerCase());
  };

  return (
    <TextField
      fullWidth
      multiline
      error={
        props.value &&
        props.value.length > 2 &&
        props.value.match(invalidPermlink)
      }
      inputProps={{
        maxLength: 255,
      }}
      id="standard-name"
      value={props.value}
      placeholder={props.placeholder}
      label="Custom permlink"
      onChange={handleChange('name')}
      margin="normal"
    />
  );
};

PermlinkInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PermlinkInput;
