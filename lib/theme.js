import { indigo, teal } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: teal[400],
      main: teal[600],
      dark: teal[800],
    },
    secondary: {
      light: indigo[400],
      main: indigo[600],
      dark: indigo[800],
    },
  },
});

export default theme;
