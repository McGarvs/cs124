import './styles/TaskList.css';
import Task from './Task';
import {useState} from "react";

function TaskList(props) {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const filteredData = props.data.filter((task) => props.showCompleted || !task.isCompleted);
    const [sortType, setSortType] = useState("default");

    function toggleDropdown() {
        setShowSortDropdown(!showSortDropdown);
    }

    function changeSortType(newType) {
        props.OnSortTypeChanged(newType)
        setSortType(newType);
    }

    return (
        <div>
            <div id="title-container">
                <div id="title">
                    My Tasks
                </div>
                <div className="dropdown">
                    <button className="sort-btn" onClick={toggleDropdown}>Sort</button>
                    {showSortDropdown && <div className="dropdown-content">
                        <a href="#default" className={sortType === "default" ? "selected-a" : ""}
                           onClick={() => changeSortType("id")}>Default</a>
                        <a href="#name" className={sortType === "name" ? "selected-a" : ""}
                           onClick={() => changeSortType("text")}>Name</a>
                        <a href="#priority"className={sortType === "priority" ? "selected-a" : ""}
                           onClick={() => changeSortType("priority")}>Priority</a>
                        <a href="#date" className={sortType === "date" ? "selected-a" : ""}
                           onClick={() => changeSortType("creationDate")}>Creation date</a>
                    </div>}
                </div>
            </div>
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