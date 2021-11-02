import './styles/TaskList.css';
import Task from './Task';
import {useState} from "react";

function TaskList(props) {
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [selectedSort, setSelectedSort] = useState("default")
    const filteredData = props.data.filter((task) => props.showCompleted || !task.isCompleted)

    function toggleDropdown() {
        setShowSortDropdown(!showSortDropdown)
    }

    function selectSortMethod(newMethod) {
        setSelectedSort(newMethod)
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
                        <a href="#default" className={selectedSort === "default" ? "selected-a" : ""} onClick={() => selectSortMethod("default")}>Default</a>
                        <a href="#name" className={selectedSort === "name" ? "selected-a" : ""} onClick={() => selectSortMethod("name")}>Name</a>
                        <a href="#priority"className={selectedSort === "priority" ? "selected-a" : ""} onClick={() => selectSortMethod("priority")}>Priority</a>
                        <a href="#date" className={selectedSort === "date" ? "selected-a" : ""} onClick={() => selectSortMethod("date")}>Creation date</a>
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