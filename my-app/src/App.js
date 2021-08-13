import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Message from "./pages/Message/Message";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import theme from "./hooks/colors";
import { ThemeProvider } from "@material-ui/styles";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <ProtectedRoute path="/" exact component={Message} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
