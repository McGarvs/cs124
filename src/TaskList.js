import './TaskList.css';
import Task from './Task';
import {useState} from 'react';

function TaskList(props) {
    // state variable for whether or not to display only completed tasks

    return (
        <div>
            {props.data.map(t => <Task key={t.id} text={t.text} isCompleted={t.isCompleted} />
            )}
        </div>
    );
}

export default TaskList;