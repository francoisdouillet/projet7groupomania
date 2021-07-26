import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import theme from "../hooks/colors";
import { ThemeProvider } from '@material-ui/styles';


const Publication = () => {
  return (
    <div className="publication">
              <ThemeProvider theme={theme}>
      <TextField
        id="standard-multiline-flexible text"
        className="publication__textarea"
        type="text"
        name="text"
        label="Exprimez-vous"
        color="secondary"
        maxRows={4}
        multiline
        required
      ></TextField>
      <div className="publication__button">

        <Button 
        variant="contained" 
        color="secondary">
          Uploader une image
        </Button>
        <Button 
        variant="contained" 
        color="secondary">
          Envoyer
        </Button>
      </div></ThemeProvider>
    </div>
  );
};

export default Publication;
