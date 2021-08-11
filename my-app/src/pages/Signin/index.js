import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useState } from "react";
import theme from "../../hooks/colors";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const Login = () => {
  //Set state
  const [state, setState] = useState({
    email: "",
    password: "",
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

  async function onClickSubmit() {
    const userInformation = {
      email: state.email,
      password: state.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        userInformation
      ).then((response) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userId", response.data.userId)
        localStorage.setItem("isAdmin", response.data.isAdmin)
        history.push('/');
      })

    } catch (error) {
      console.error(error);
      alert('Mot de passe incorect')
    }
  }

  return (
    <div className="signup">
      <form className="signup__form">
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            color="secondary"
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-basic"
            color="secondary"
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={onClickSubmit}
          >
            Se connecter
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
}

export default Login;
