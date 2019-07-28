import { grey, indigo, teal } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const getTheme = theme => {
  return createMuiTheme({
    palette: {
      type: theme.paletteType,
      primary: {
        default: '#ffff00',
        light: teal[400],
        main: teal[600],
        dark: teal[800],
      },
      secondary: {
        light: indigo[400],
        main: indigo[600],
        dark: indigo[800],
      },
      background: {
        light: theme.paletteType === 'light' ? grey[100] : grey[700],
        dark: theme.paletteType === 'light' ? grey[100] : grey[900],
      },
    },
  });
};

const theme = getTheme({
  paletteType: 'dark',
});

export default theme;
