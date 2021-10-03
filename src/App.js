import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './Routes/Home';
import LabelRoute from './Routes/LabelRoute';

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/label/:id" exact>
          <LabelRoute />
        </Route>
        <Route path="*">
          <Redirect to="/home">
            <Home />
          </Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
