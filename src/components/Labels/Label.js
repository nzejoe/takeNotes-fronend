import React from 'react'
import { NavLink } from 'react-router-dom'

// icons
import { VscArrowRight } from 'react-icons/vsc'

// styles
import styles from './Label.module.css'

const Label = ({ id, name, showLabel }) => {
  return (
    <NavLink
      to={`/label/${name}/`}
      activeClassName={styles.active}
      className={`${styles.label} ${showLabel && styles.show__label}`}
    >
      <VscArrowRight className={`${styles.label__icon}`} />
      <span className={`${styles.label__name}`}>{name}</span>
    </NavLink>
  );
};

export default Label