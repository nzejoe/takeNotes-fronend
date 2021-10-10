import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Content from '../components/Layout/Content'
import { noteActions } from '../store/note-slice';

const LabelRoute = () => {
    const [labelID, setLabelID] = useState(null)
    const labels = useSelector(state => state.label.labels);
    const {name} = useParams();

    const dispatch = useDispatch();

    const foundLabel = labels.find(label => label.name === name);

   

    useEffect(() => {
         if (foundLabel) {
           setLabelID(foundLabel.id);
         }
      dispatch(noteActions.filterNotes(labelID));
    }, [dispatch, labelID, foundLabel]);

    return (
        <div>
            <Content/>
        </div>
    )
}

export default LabelRoute
