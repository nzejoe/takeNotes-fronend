import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLabels } from "../../store/label-slice";
import { openLabelModal } from "../../store/modal-slice";
import { Label } from ".";
import { NavLink } from "react-router-dom";

// ui
import { Modal } from "../UI";

// style
import styles from "./Label.module.css";
// icons
import { FaPlusSquare } from "react-icons/fa";

const LabelList = () => {
  const {labels, refresh} = useSelector((state) => state.label);
  const { authUser } = useSelector((state) => state.users);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  useEffect(() => {
    // only fetch label if token is acquired to avoid error flag
    if (token) {
      dispatch(fetchLabels(token));
    }
  }, [dispatch, token, refresh]);

  // add handler
  const addHandler = () => {
    dispatch(openLabelModal())
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
      {isOpen && <Modal />}
    </div>
  );
};

export default LabelList;
