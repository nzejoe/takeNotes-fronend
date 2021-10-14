import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Content from "../components/Layout/Content";
import { noteActions } from "../store/note-slice";

const Home = () => {
  const { allNotes } = useSelector(state => state.note);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(noteActions.getAllNotes())
  },[dispatch, allNotes])

  return <Content/>;
};;

export default Home;
