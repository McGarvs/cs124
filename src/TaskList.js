import Task from './Task';
import {useState} from 'react';

function TaskList(props) {

    return (
        <div>
            {props.data.map(t => <Task key={t.id} text={t.text} isCompleted={t.isCompleted} />
            )}
        </div>
    );
}

export default TaskList;