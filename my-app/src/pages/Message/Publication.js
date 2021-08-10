import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import theme from "../../hooks/colors";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";

import React, { useState } from "react";

const Publication = () => {
  const [content, setContent] = useState();
  const [attachment, setAttachment] = useState();

  const send = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("content", content);
    data.append("image", attachment);

    axios
      .post("http://localhost:3001/api/posts", data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => console.log(res), alert("Message crée"))
      .then(() => {document.location.reload()})
      .catch((err) => console.log(err));
  };

  return (
    <div className="publication">
      <ThemeProvider theme={theme}>
        <form>
          <TextField
            id="standard-multiline-flexible content"
            className="publication__textarea"
            label="Exprimez-vous"
            color="secondary"
            type="text"
            name="content"
            maxRows={4}
            multiline
            required
            onChange={(event) => {
              const { value } = event.target;
              setContent(value);
            }}
          />
          <div className="publication__button">
            <input
              accept="image/*"
              id="contained-button-file attachment"
              multiple={false}
              type="file"
              name="image"
              variant="contained"
              color="secondary"
              onChange={(event) => {
                const attachment = event.target.files[0];
                setAttachment(attachment);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={send}
            >
              Envoyer
            </Button>
          </div>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default Publication;
