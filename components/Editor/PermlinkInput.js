import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { invalidPermlink } from '../../helpers/regex';

const PermlinkInput = props => {
  const { data, onChange } = props;

  const [value, setValue] = useState(data);
  const [timer, setTimer] = useState(undefined);

  const triggerChange = () => {
    onChange(value);
  };

  const handleChange = () => event => {
    setTimer(clearTimeout(timer));

    setValue(event.target.value.toLowerCase());

    setTimer(setTimeout(triggerChange, 1000));
  };

  return (
    <TextField
      fullWidth
      multiline
      error={value && value.length > 2 && value.match(invalidPermlink)}
      inputProps={{
        maxLength: 255,
      }}
      id="standard-name"
      value={value}
      placeholder={props.placeholder}
      label="Custom permlink"
      onChange={handleChange('name')}
      margin="normal"
    />
  );
};

PermlinkInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PermlinkInput;
