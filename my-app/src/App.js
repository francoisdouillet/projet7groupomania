import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Message from "./pages/Message/Message";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <ProtectedRoute path="/" exact component={Message} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
