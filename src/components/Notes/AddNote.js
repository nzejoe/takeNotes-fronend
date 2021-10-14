import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { addNewNote } from '../../store/note-slice';

const AddNote = () => {
    const { authUser } = useSelector(state => state.users);
    const labels = useSelector(state => state.label.labels);
    const [selectLabel, setSelectedLabel] = useState('');
    const titleRef = useRef();
    const textRef = useRef();

    const history = useHistory();
    const dispatch = useDispatch();

    const token = authUser && authUser.token

    const handleSubmit = async(event) => {
        event.preventDefault();
        setSelectedLabel('')
        const newNote = {
            title: titleRef.current.value,
            text: textRef.current.value,
            label: selectLabel,
        }

        dispatch(addNewNote({newNote, token}));
        titleRef.current.value = '';
        textRef.current.value = '';
        history.push('/home');
    };

    const labelChangeHandler = (event) => {
      setSelectedLabel(event.target.value);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title"></label>
            <input type="text" id="title" placeholder="title" ref={titleRef}/>
          </div>
          <div className="form-group">
            <label htmlFor="text"></label>
            <textarea id="text" placeholder="note" ref={textRef} cols="50" rows="5"/>
          </div>
          <div className="form-group">
            <label htmlFor="label">label</label>
            <select name="label" id="label" onChange={labelChangeHandler} value={selectLabel}>
              <option value=''>Choose label</option>
              {labels.map(label => {
                return <option key={label.id} value={label.id}>{label.name}</option>;
              })}
            </select>
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    );
}

export default AddNote
