import TextField from '@material-ui/core/TextField';
import React from 'react';

const PermlinkInput = props => {
  const handleChange = name => event => {
    props.onChange(event.target.value);
  };

  return (
    <TextField
      error={
        props.value &&
        props.value.length > 2 &&
        props.value.match(/[^a-zA-Z0-9-]/)
      }
      id="standard-name"
      value={props.value}
      placeholder={props.placeholder}
      //   label="Name"
      //   className={classes.textField}
      //   value={values.name}
      onChange={handleChange('name')}
      margin="normal"
    />
  );
};

export default PermlinkInput;
