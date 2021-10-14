import './styles/TaskList.css';
import Task from './Task';
import {useState} from "react";

function TaskList(props) {
    // state variable for whether or not to display only completed tasks
    // const [data, setData] = useState(props.data)

    const newlist = props.data.filter((task) => props.showCompleted || !task.isCompleted)

    return (
        <div>
            {newlist.map((item) => <Task key={item.id}
                                            onItemChanged={props.onItemChanged}
                                            onDeleteID={props.onDeleteID}
                                            onDeleteModalDisplay={props.onDeleteModalDisplay}
                                            {...item} />)
            }
        </div>
    );
}

export default TaskList;