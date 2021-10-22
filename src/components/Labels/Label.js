import React from 'react'
import { NavLink } from 'react-router-dom'

// icons
import { VscArrowRight } from 'react-icons/vsc'

// styles
import styles from './Label.module.css'

const Label = ({id, name}) => {
    return (
      <NavLink
        to={`/label/${name}/`}
        activeClassName={styles.active}
        className={styles.label}
      >
        <VscArrowRight className={styles.label__icon} />
        <span>{name}</span>
      </NavLink>
    );
}

export default Label