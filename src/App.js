import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// slice
import { noteActions } from './store/note-slice';

// routes
import Home from './Routes/Home';
import LabelRoute from './Routes/LabelRoute';

import "./App.css";

function App() {
  const refresh = useSelector((state) => state.note.refresh);

  const dispatch = useDispatch();

  // fetch data from server
  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get("/notes/");
      dispatch(noteActions.setNotes(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // fetch data on first render
  useEffect(() => {
    fetchNotes();
  }, [refresh, fetchNotes]); // fetch data whenever the refresh state changes


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
