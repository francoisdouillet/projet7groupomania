import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import theme from "../../hooks/colors";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";

import { useForm } from "react-hook-form";

const Publication = () => {
  /*const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const onClickSubmit = async (event) => {

    try {
      const response = await axios.post(
        "http://localhost:3001/api/posts/",
        onSubmit
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }; */

  const { register, handleSubmit } = useForm() 

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/posts/",
        data
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="publication">
      <ThemeProvider theme={theme}>
      <form /*onSubmit={handleSubmit(onClickSubmit)}*/ onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("content", { required: true })}
          id="standard-multiline-flexible username"
          className="publication__textarea"
          label="Exprimez-vous"
          color="secondary"
          type="text"
          name="content"
          maxRows={4}
          multiline
          required
        />
        <div className="publication__button">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple={false}
            type="file"
            name="image"
            {...register("attachment", { required: true })}
            variant="contained"
            color="secondary"
          />
          <Button variant="contained" color="secondary" type="submit">
            Envoyer
          </Button>
        </div>
      </form>
      </ThemeProvider>
    </div>
  );
};

export default Publication;
