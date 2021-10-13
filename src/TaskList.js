import './styles/TaskList.css';
import Task from './Task';
import {useState} from "react";

function TaskList(props) {
    // state variable for whether or not to display only completed tasks
    const [data, setData] = useState(props.data)

    function filteredData(){
        if (props.showCompleted){
            setData(data.filter((task) => task.isCompleted === true));
            return data
        } else {
            setData(props.data);
            return data
        }
    }


    return (
        <div>
            {props.data.map((item) => <Task key={item.id}
                                            onItemChanged={props.onItemChanged}
                                            onDeleteID={props.onDeleteID}
                                            onDeleteModalDisplay={props.onDeleteModalDisplay}
                                            {...item} />)
            }
        </div>
    );
}

export default TaskList;