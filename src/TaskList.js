import './styles/TaskList.css';
import Task from './Task';

function TaskList(props) {
    const filteredData = props.data.filter((task) => props.showCompleted || !task.isCompleted)
    return (
        <div>
            {filteredData.map((item) => <Task key={item.id}
                                            onItemChanged={props.onItemChanged}
                                            onDeleteID={props.onDeleteID}
                                            onDeleteModalDisplay={props.onDeleteModalDisplay}
                                            {...item} />)
            }
        </div>
    );
}

export default TaskList;