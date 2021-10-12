import React from "react";

// style
import { styles } from ".";

const Authentication = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Authentication;
