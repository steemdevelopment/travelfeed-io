import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import deburr from 'lodash.deburr';
import PropTypes from 'prop-types';
import React from 'react';
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
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
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
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

class DownshiftMultiple extends React.Component {
  state = {
    inputValue: '',
    selectedItem: ['travelfeed'],
  };

  componentDidMount() {
    let tags = ['travelfeed'];
    if (this.props.initialValue) {
      tags = this.props.initialValue;
    }
    this.setState({
      selectedItem: tags,
    });
  }

  handleKeyDown = event => {
    //   Todooooo
    const { inputValue } = this.state;
    let { selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace' &&
      selectedItem[selectedItem.length - 1] !== 'travelfeed'
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
      this.props.onChange({
        tags: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
    if (
      event.key === ' ' &&
      inputValue.length &&
      inputValue.length < 20 &&
      inputValue.replace(/\s/g, '').match(allSpecialChars) === null &&
      selectedItem.length < 5
    ) {
      const item = this.state.inputValue.toLowerCase().replace(/\s/g, '');

      if (selectedItem.indexOf(item) === -1) {
        selectedItem = [...selectedItem, item];
      }

      this.setState({
        inputValue: '',
        selectedItem,
      });
      this.props.onChange({
        tags: selectedItem,
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;
    //  If 5 Tags already, don't autocomplete
    if (selectedItem.length < 5) {
      if (selectedItem.indexOf(item) === -1) {
        selectedItem = [...selectedItem, item];
      }

      this.setState({
        inputValue: '',
        selectedItem,
      });
      this.props.onChange({
        tags: selectedItem,
      });
    }
  };

  handleDelete = item => () => {
    if (item !== 'travelfeed') {
      const { selectedItem } = this.state;
      selectedItem.splice(selectedItem.indexOf(item), 1);
      this.setState({ selectedItem });
      this.props.onChange({
        tags: selectedItem,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
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
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                // onKeyDown: () => {
                //   this.handleChange;
                //   this.props.onChange({
                //     tags: selectedItem
                //   });
                // },
                placeholder: 'Add tags',
              }),
              label: 'Tags',
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
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  initialValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DownshiftMultiple);
