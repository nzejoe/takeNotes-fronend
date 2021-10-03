import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Content from "../components/Layout/Content";
import { noteActions } from "../store/note-slice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(noteActions.getAllNotes())
  },[dispatch])

  return <Content/>;
};;

export default Home;
