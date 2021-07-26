import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Message from "./pages/Message";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/message" component={Message} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
