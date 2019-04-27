import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { allSpecialChars } from "../../utils/regex";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const suggestions = [
  { label: "foodoftheworld" },
  { label: "traveladvice" },
  { label: "travel" },
  { label: "photography" },
  { label: "photofeed" },
  { label: "introduceyourself" },
  { label: "animals" },
  { label: "birds" },
  { label: "cats" },
  { label: "china" },
  { label: "deutsch" },
  { label: "contest" },
  { label: "culture" },
  { label: "family" },
  { label: "nature" },
  { label: "news" },
  { label: "video" },
  { label: "walkwithme" },
  { label: "wednesdaywalk" },
  { label: "marketfriday" },
  { label: "afghanistan" },
  { label: "albania" },
  { label: "algeria" },
  { label: "andorra" },
  { label: "angola" },
  { label: "argentina" },
  { label: "armenia" },
  { label: "australia" },
  { label: "austria" },
  { label: "azerbaijan" },
  { label: "bahamas" },
  { label: "bahrain" },
  { label: "bangladesh" },
  { label: "barbados" },
  { label: "belarus" },
  { label: "belgium" },
  { label: "belize" },
  { label: "benin" },
  { label: "bhutan" },
  { label: "bolivia" },
  { label: "bosniaherzegovina" },
  { label: "botswana" },
  { label: "brazil" },
  { label: "brunei" },
  { label: "bulgaria" },
  { label: "burkina" },
  { label: "burundi" },
  { label: "cambodia" },
  { label: "cameroon" },
  { label: "canada" },
  { label: "chad" },
  { label: "chile" },
  { label: "china" },
  { label: "colombia" },
  { label: "comoros" },
  { label: "congo" },
  { label: "congo" },
  { label: "costarica" },
  { label: "croatia" },
  { label: "cuba" },
  { label: "cyprus" },
  { label: "czechrepublic" },
  { label: "denmark" },
  { label: "djibouti" },
  { label: "dominica" },
  { label: "dominicanrepublic" },
  { label: "easttimor" },
  { label: "ecuador" },
  { label: "egypt" },
  { label: "elsalvador" },
  { label: "equatorialguinea" },
  { label: "eritrea" },
  { label: "estonia" },
  { label: "ethiopia" },
  { label: "fiji" },
  { label: "finland" },
  { label: "france" },
  { label: "gabon" },
  { label: "gambia" },
  { label: "georgia" },
  { label: "germany" },
  { label: "ghana" },
  { label: "greece" },
  { label: "grenada" },
  { label: "guatemala" },
  { label: "guinea" },
  { label: "guineabissau" },
  { label: "guyana" },
  { label: "haiti" },
  { label: "honduras" },
  { label: "hungary" },
  { label: "iceland" },
  { label: "india" },
  { label: "indonesia" },
  { label: "iran" },
  { label: "iraq" },
  { label: "ireland" },
  { label: "israel" },
  { label: "italy" },
  { label: "jamaica" },
  { label: "japan" },
  { label: "jordan" },
  { label: "kazakhstan" },
  { label: "kenya" },
  { label: "kiribati" },
  { label: "northkorea" },
  { label: "southkorea" },
  { label: "kosovo" },
  { label: "kuwait" },
  { label: "kyrgyzstan" },
  { label: "laos" },
  { label: "latvia" },
  { label: "lebanon" },
  { label: "lesotho" },
  { label: "liberia" },
  { label: "libya" },
  { label: "liechtenstein" },
  { label: "lithuania" },
  { label: "luxembourg" },
  { label: "macedonia" },
  { label: "madagascar" },
  { label: "malawi" },
  { label: "malaysia" },
  { label: "maldives" },
  { label: "mali" },
  { label: "malta" },
  { label: "mauritania" },
  { label: "mauritius" },
  { label: "mexico" },
  { label: "micronesia" },
  { label: "moldova" },
  { label: "monaco" },
  { label: "mongolia" },
  { label: "montenegro" },
  { label: "morocco" },
  { label: "mozambique" },
  { label: "myanmar" },
  { label: "burma" },
  { label: "namibia" },
  { label: "nauru" },
  { label: "nepal" },
  { label: "netherlands" },
  { label: "newzealand" },
  { label: "nicaragua" },
  { label: "niger" },
  { label: "nigeria" },
  { label: "norway" },
  { label: "oman" },
  { label: "pakistan" },
  { label: "palau" },
  { label: "panama" },
  { label: "papuanewguinea" },
  { label: "paraguay" },
  { label: "peru" },
  { label: "philippines" },
  { label: "poland" },
  { label: "portugal" },
  { label: "qatar" },
  { label: "romania" },
  { label: "russia" },
  { label: "rwanda" },
  { label: "samoa" },
  { label: "sanmarino" },
  { label: "saudiarabia" },
  { label: "senegal" },
  { label: "serbia" },
  { label: "seychelles" },
  { label: "sierraleone" },
  { label: "singapore" },
  { label: "slovakia" },
  { label: "slovenia" },
  { label: "somalia" },
  { label: "southafrica" },
  { label: "southsudan" },
  { label: "spain" },
  { label: "srilanka" },
  { label: "sudan" },
  { label: "suriname" },
  { label: "swaziland" },
  { label: "sweden" },
  { label: "switzerland" },
  { label: "syria" },
  { label: "taiwan" },
  { label: "tajikistan" },
  { label: "tanzania" },
  { label: "thailand" },
  { label: "togo" },
  { label: "tonga" },
  { label: "trinidadandtobago" },
  { label: "tunisia" },
  { label: "turkey" },
  { label: "turkmenistan" },
  { label: "tuvalu" },
  { label: "uganda" },
  { label: "ukraine" },
  { label: "uar" },
  { label: "uk" },
  { label: "unitedstates" },
  { label: "uruguay" },
  { label: "uzbekistan" },
  { label: "vanuatu" },
  { label: "vatican" },
  { label: "venezuela" },
  { label: "vietnam" },
  { label: "yemen" },
  { label: "zambia" },
  { label: "zimbabwe" }
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
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
    inputValue: "",
    selectedItem: ["travelfeed"]
  };
  componentDidMount() {
    let tags = ["travelfeed"];
    if (this.props.initialValue) {
      tags = this.props.initialValue;
    }
    this.setState({
      selectedItem: tags
    });
  }

  handleKeyDown = event => {
    //   Todooooo
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace" &&
      selectedItem[selectedItem.length - 1] !== "travelfeed"
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
      this.props.onChange({
        tags: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
    if (
      event.key === " " &&
      inputValue.length &&
      inputValue.length < 20 &&
      inputValue.replace(/\s/g, "").match(allSpecialChars) === null &&
      selectedItem.length < 5
    ) {
      let item = this.state.inputValue.toLowerCase().replace(/\s/g, "");
      let { selectedItem } = this.state;

      if (selectedItem.indexOf(item) === -1) {
        selectedItem = [...selectedItem, item];
      }

      this.setState({
        inputValue: "",
        selectedItem
      });
      this.props.onChange({
        tags: selectedItem
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
        inputValue: "",
        selectedItem
      });
      this.props.onChange({
        tags: selectedItem
      });
    }
  };

  handleDelete = item => () => {
    if (item !== "travelfeed") {
      const selectedItem = this.state.selectedItem;
      selectedItem.splice(selectedItem.indexOf(item), 1);
      this.setState({ selectedItem });
      this.props.onChange({
        tags: selectedItem
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
          highlightedIndex
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
                placeholder: "Add tags"
              }),
              label: "Tags"
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DownshiftMultiple);
