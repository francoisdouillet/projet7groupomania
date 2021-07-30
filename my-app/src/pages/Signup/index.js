import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../hooks/colors";


const Register = () => {
  //Set state
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
    successMessage: null,
  });

  //HandleChange for form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const history = useHistory();


  const handleSubmitClick = async (event) => {
    event.preventDefault();
    const userInformation = {
      email: state.email,
      username: state.username,
      password: state.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/signup",
        userInformation
      );
      console.log(response)
      alert('Utilisateur créé')
      history.push("/signin");
    } catch (error) {
      console.error(error);
      alert('BAD REQUEST: Email or Username unavailable')
    }

  };

  return (
    <div className="signup">
      <form className="signup__form">
        <ThemeProvider theme={theme}>
        <TextField
          id="outlined-basic"
          color="secondary"
          label="Username"
          variant="outlined"
          type="username"
          name="username"
          id="username"
          placeholder="username*"
          onChange={handleChange}
          value={state.username}
          required
        />
        <TextField
          id="outlined-basic"
          color="secondary"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={handleChange}
          value={state.email}
          required
        />
        <TextField
          id="outlined-basic"
          color="secondary"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          id="password"
          placeholder="mot de passe*"
          onChange={handleChange}
          value={state.password}
          required
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmitClick}
          id="submit"
        >
          S'inscrire
        </Button>
        </ThemeProvider>
      </form>
    </div>
  );
}

export default Register;
