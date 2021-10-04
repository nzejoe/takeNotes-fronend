import React from 'react'
import { NavLink } from 'react-router-dom'

const Label = ({id, name, classes}) => {
    return (
        <NavLink to={`/label/${name}/`} activeClassName={classes.active} className={classes.label}>
            {name}
        </NavLink>
    )
}

export default Label