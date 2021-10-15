// import './styles/TaskList.css';
import Task from './Task';

function TaskList(props) {
    const filteredData = props.data.filter((task) => props.showCompleted || !task.isCompleted)
    return (
        <div>
            {(filteredData.length === 0) ? (props.data.length > 0) ?
                    <div>Your tasks are all complete. Try clicking Show Completed above!</div>
                    :<div>Your task list is empty. Try entering a task in the form above!</div>
            : filteredData.map((item) => <Task key={item.id}
                                            onItemChanged={props.onItemChanged}
                                            onDeleteID={props.onDeleteID}
                                            onDeleteModalDisplay={props.onDeleteModalDisplay}
                                            {...item} />)
            }
        </div>
    );
}

export default TaskList;