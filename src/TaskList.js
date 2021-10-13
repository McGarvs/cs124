import './styles/TaskList.css';
import Task from './Task';

function TaskList(props) {
    // state variable for whether or not to display only completed tasks

    return (
        <div>
            {props.data.map((item) => <Task key={item.id}
                                            onItemChanged={props.onItemChanged}
                                            onDeleteID={props.onDeleteID}
                                            onDeleteModalDisplay={props.onDeleteModalDisplay}
                                            {...item} />
            )}
        </div>
    );
}

export default TaskList;