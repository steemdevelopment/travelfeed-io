import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import Downshift from 'downshift';
import deburr from 'lodash.deburr';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { allSpecialChars } from '../../helpers/regex';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 2,
  },
  paper: {
    position: 'relative',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
});

const suggestions = [
  { label: 'roadtrip' },
  { label: 'beach' },
  { label: 'backpacking' },
  { label: 'mountains' },
  { label: 'wildlife' },
  { label: 'budgettravel' },
  { label: 'festivals' },
  { label: 'adventure' },
  { label: 'hiking' },
  { label: 'animals' },
  { label: 'hitchhiking' },
  { label: 'cyclefeed' },
  { label: 'digitalnomads' },
  { label: 'photography' },
  { label: 'foodoftheworld' },
  { label: 'traveladvice' },
  { label: 'photofeed' },
  { label: 'introduceyourself' },
  { label: 'birds' },
  { label: 'contest' },
  { label: 'culture' },
  { label: 'family' },
  { label: 'nature' },
  { label: 'news' },
  { label: 'video' },
  { label: 'walkwithme' },
  { label: 'wednesdaywalk' },
  { label: 'marketfriday' },
  { label: 'palnet' },
  { label: 'creativecoin' },
  { label: 'neoxian' },
  { label: 'sct' },
];

const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 10 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const TagPicker = props => {
  const [inputValue, setInputValue] = useState('');
  // const [selectedItem, props.onChange]/ = useState([props.defaultTag]);

  const selectedItem = props.value;

  // useEffect(() => {
  //   let tags = [props.defaultTag];
  //   if (props.value) {
  //     tags = props.value;
  //   }
  //   props.onChange(tags);
  // }, []);

  const handleKeyDown = event => {
    //   Todooooo
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace' &&
      selectedItem[selectedItem.length - 1] !== props.defaultTag
    ) {
      props.onChange(selectedItem.slice(0, selectedItem.length - 1));
    }
    if (
      (event.key === ' ' || event.key === ',') &&
      inputValue.length &&
      inputValue.length < 20 &&
      inputValue.match(/[a-zA-Z0-9]/) &&
      inputValue.replace(/\s/g, '').match(allSpecialChars) === null &&
      selectedItem.length < 10
    ) {
      const item = inputValue
        .toLowerCase()
        .replace(/,/g, '')
        .replace(/\s/g, '');

      if (selectedItem.indexOf(item) === -1 && item !== props.defaultTag) {
        props.onChange([...selectedItem, item]);
        setInputValue('');
      }
    }
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleChange = item => {
    //  If 10 Tags already, don't autocomplete
    if (selectedItem.length < 10 && item !== props.defaultTag) {
      if (selectedItem.indexOf(item) === -1) {
        props.onChange([...selectedItem, item]);
        setInputValue('');
      }
    }
  };

  const handleDelete = item => () => {
    if (item !== props.defaultTag) {
      selectedItem.splice(selectedItem.indexOf(item), 1);
      props.onChange(selectedItem);
    }
  };

  const { classes } = props;

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => (
        <div className={classes.container}>
          {renderInput({
            fullWidth: true,
            classes,
            InputProps: getInputProps({
              startAdornment: selectedItem.map((item, index) => (
                <Fragment>
                  {(index === 0 && (
                    <Chip
                      key={props.defaultTag}
                      tabIndex={-1}
                      label={props.defaultTag}
                      className={classes.chip}
                    />
                  )) || (
                    <Chip
                      key={item}
                      color={
                        ['palnet', 'creativecoin', 'sct', 'neoxian'].indexOf(
                          item,
                        ) > -1
                          ? 'primary'
                          : 'secondary'
                      }
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )}
                </Fragment>
              )),
              onChange: handleInputChange,
              onKeyDown: handleKeyDown,
              // onKeyDown: () => {
              //   handleChange;
              //   props.onChange({
              //     tags: selectedItem
              //   });
              // },
              placeholder: 'Add tags',
            }),
            label: '',
          })}
          {isOpen ? (
            <Paper className={classes.paper} square>
              {getSuggestions(inputValue2).map((suggestion, index) =>
                renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion.label }),
                  highlightedIndex,
                  selectedItem: selectedItem2,
                }),
              )}
            </Paper>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

TagPicker.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultTag: PropTypes.string.isRequired,
};

export default withStyles(styles)(TagPicker);
