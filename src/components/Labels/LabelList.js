import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setLabels } from "../../store/label-slice";
import { openLabel } from "../../store/modal-slice";
import { Label } from ".";
import { NavLink } from "react-router-dom";

// ui
import { Modal } from "../UI";

// style
import styles from "./Label.module.css";
// icons
import { FaPlusSquare } from "react-icons/fa";

const LabelList = () => {
  const labels = useSelector((state) => state.label.labels);
  const { authUser } = useSelector((state) => state.users);
  const { labelAdd } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const token = authUser && authUser.token;

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
    if (token) {
      fetchLabels();
    }
  }, [fetchLabels, token]);

  const addHandler = () => {
    dispatch(openLabel());
  };

  return (
    <div className={styles.wrapper}>
      <NavLink
        to="/home"
        activeClassName={styles.active}
        className={styles.label}
      >
        Notes
      </NavLink>
      {labels.map((label) => {
        return <Label key={label.id} {...label} classes={styles} />;
      })}
      <FaPlusSquare
        className={styles.add__icon}
        title="Add label"
        onClick={addHandler}
      />
      {labelAdd && <Modal />}
    </div>
  );
};

export default LabelList;
