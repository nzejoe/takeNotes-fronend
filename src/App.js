import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// slice
import { noteActions } from "./store/note-slice";

// routes
import Home from "./Routes/Home";
import LabelRoute from "./Routes/LabelRoute";

import "./App.css";

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const refresh = useSelector((state) => state.note.refresh);

  const dispatch = useDispatch();

  // fetch data from server
  useEffect(() => {
    axios
      .get("/notes/")
      .then((res) => {
        dispatch(noteActions.setNotes(res.data));
      })
      .catch((error) => console.log(error));
  }, [dispatch, refresh]); // fetch data whenever the refresh state changes

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/label/:name" exact>
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
