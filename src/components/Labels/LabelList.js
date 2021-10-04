import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { labelActions } from "../../store/label-slice";
import { Label } from ".";
import { NavLink } from "react-router-dom";

// style
import classes from './LabelList.module.css'

const LabelList = () => {
  const labels = useSelector((state) => state.label.labels);
  const dispatch = useDispatch();
  

  const fetchLabels = useCallback(async () => {
    try {
      const response = await axios.get("/labels/");
      dispatch(labelActions.setLabels(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

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
