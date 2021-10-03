import React from "react";
import { useSelector } from "react-redux";

const Note = ({ title, text, created,label:labelID }) => {
  const labels = useSelector(state => state.label.labels)

  const label = labels.find((thisLabel) => thisLabel.id === labelID);

  let labelName = ''

  if(label){ // if note has label
    labelName = label.name // set name
  }



  return (
    <div>
      <p>
        <small>{created}</small>
      </p>
      <h4>{title}</h4>
      <p>{text}</p>
      <p>
        <small>{labelName}</small>
      </p>
      <hr />
    </div>
  );
};

export default Note;
