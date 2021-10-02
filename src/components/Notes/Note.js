import React from "react";

const Note = ({ title, text, created,label }) => {
  return (
    <div>
      <p>
        <small>{created}</small>
      </p>
      <h4>{title}</h4>
      <p>{text}</p>
      <p>
        <small>{label}</small>
      </p>
      <hr />
    </div>
  );
};

export default Note;
