import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';


const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Switch>
         <Route path="/" exact component={Signup} />
         <Route path="/signup" component={Signin} />
         <Route path="/home" component={Home} />
       </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
