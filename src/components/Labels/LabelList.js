import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setLabels } from "../../store/label-slice";
import { Label } from ".";
import { NavLink } from "react-router-dom";

// style
import classes from './LabelList.module.css'

const LabelList = () => {
  const labels = useSelector((state) => state.label.labels);
  const { authUser } = useSelector(state => state.users)
  const dispatch = useDispatch();
  
  const token = authUser && authUser.token

  const fetchLabels = useCallback(async () => {
    try {
      const response = await axios({
        url: "/labels/",
        method: "GET",
        headers: {
          authorization: `token ${token}`,
        },
      });
      dispatch(setLabels(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    // only fetch label if token is acquired to avoid error flag
    if(token){
      fetchLabels();
    }
  }, [fetchLabels, token]);

  return (
    <div>
      <NavLink to="/home" activeClassName={classes.active} className={classes.label}>Notes</NavLink>
      {labels.map((label) => {
        return <Label key={label.id} {...label} classes={classes}/>;
      })}
    </div>
  );
};

export default LabelList;
