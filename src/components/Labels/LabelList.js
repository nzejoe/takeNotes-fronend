import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { labelActions } from "../../store/label-slice";
import { Label } from ".";

const LabelList = () => {
  const labels = useSelector((state) => state.label.labels);
  const dispatch = useDispatch();
  console.log(labels);

  const fetchLabels = useCallback(async () => {
    try {
      const response = await axios.get("/notes/labels/");
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
      {labels.map((label) => {
        return <Label key={label.id} {...label}/>;
      })}
    </div>
  );
};

export default LabelList;
