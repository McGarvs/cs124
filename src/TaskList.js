import './TaskList.css';
import Task from './Task';

function TaskList(props) {
    // state variable for whether or not to display only completed tasks

    return (
        <div>
            {props.data.map((item) => <Task key={item.id}
                                            onCompletedChanged={(itemID, field, newValue) => props.onItemChanged(itemID, field, newValue)}
                                            onItemChanged={props.onItemChanged} {...item} />
            )}
        </div>
    );
}

export default TaskList;