import React from 'react'

const Note = ({title, text, created}) => {
    return (
        <div>
            <p><small>{created}</small></p>
            <h4>{title}</h4>
            <p>{text}</p>
            <hr />
        </div>
    )
}

export default Note;
