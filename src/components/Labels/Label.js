import React from 'react'
import { NavLink } from 'react-router-dom'

const Label = ({id, name, className}) => {
    return (
        <NavLink to={`/label/${name}/`} activeClassName={className}>
            {name}
        </NavLink>
    )
}

export default Label