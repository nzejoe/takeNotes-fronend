import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Content from "../components/Layout/Content";
import { getAllNotes } from "../store/note-slice";

const Home = () => {
  const { allNotes } = useSelector(state => state.note);
  const { isAuthenticated } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(()=>{
   if(isAuthenticated){
      dispatch(getAllNotes());
   }
  },[dispatch, allNotes, isAuthenticated]);

  return <Content/>;
};;

export default Home;
