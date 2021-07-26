
import { createTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#fc2c01',
    },
  },
});

export default theme;