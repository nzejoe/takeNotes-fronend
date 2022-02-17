import React from "react";

// style
import { styles } from ".";

const Authentication = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__inner}>{children}</div>
    </div>
  );
};

export default Authentication;
