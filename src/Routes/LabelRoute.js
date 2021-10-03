import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Content from '../components/Layout/Content'
import { noteActions } from '../store/note-slice';

const LabelRoute = () => {
    const labels = useSelector(state => state.label.labels)
    const {name} = useParams()

    const dispatch = useDispatch();

    const foundLabel = labels.find(label => label.name === name);

    useEffect(() => {
      dispatch(noteActions.filterNotes(foundLabel.id));
    }, [dispatch, foundLabel]);

    return (
        <div>
            <Content/>
        </div>
    )
}

export default LabelRoute
