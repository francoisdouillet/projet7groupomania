import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import theme from "../hooks/colors";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import React, { useState } from "react";

const Publication = () => {
  const [state, setState] = useState({
    content: "",
    attachment: "",
  });

  //HandleChange for form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onClickSubmit = async (event) => {
    event.preventDefault();
    const postInformation = {
      content: state.content,
      attachment: state.attachment,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/posts/",
        postInformation
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
          value={state.content}
          onChange={handleChange}
          maxRows={4}
          multiline
          required
        ></TextField>
        <div className="publication__button">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            value={state.attachment}
            onChange={handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="secondary" component="span">
              Uploader une image
            </Button>
          </label>
          <Button variant="contained" color="secondary" onClick={onClickSubmit}>
            Envoyer
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Publication;
