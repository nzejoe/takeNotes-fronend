import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeLabel } from '../../store/modal-slice';

// ui
import { Card } from '../UI';

// styles
import styles from './Label.module.css'

const LabelAdd = () => {
    const { labels } = useSelector(state => state.label)
    const labelRef = useRef()
     const dispatch = useDispatch();

     const closeHandler = () => {
       dispatch(closeLabel());
     };

     const handleSubmit = (e) => {
         e.preventDefault()
         console.log(labelRef.current.value)
         dispatch(closeLabel());
     }

    return (
      <Card className={styles.add__label} >
        <form className={styles.form__add} onSubmit={handleSubmit}>
            <input type="text" placeholder="Add label" className={styles.input} ref={labelRef}/>
            <button type="submit" className={styles.btn__submit}>Add</button>
        </form>
        {labels.map(label => {
            return <span key={label.id} className={styles.label}>{label.name}</span>
        })}
        <hr />
        <button onClick={closeHandler}>close</button>
      </Card>
    );
}

export default LabelAdd
