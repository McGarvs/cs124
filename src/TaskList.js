import './styles/TaskList.css';
import Task from './Task';
import {useState} from "react";

function TaskList(props) {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const filteredData = props.data.filter((task) => props.showCompleted || !task.isCompleted);

    function toggleDropdown() {
        setShowSortDropdown(!showSortDropdown);
    }

    return (
        <div id="tasklist-container">
            <div id="title-container">
                <div id="title">
                    My Tasks
                </div>
                <div className="dropdown">
                    <button className={(filteredData.length !== 0) ? "sort-btn-active" : "sort-btn-disabled"}
                            onClick={toggleDropdown} tabIndex={props.modalDisplayed ? "-1" : ""}
                            onKeyDown={(e) => (filteredData.length === 0) && e.preventDefault()}>Sort</button>
                    {showSortDropdown && <div className="dropdown-content">
                        {/*<a href="#default" className={props.sortType === "id" ? "selected-a" : ""}*/}
                        {/*   onClick={() => props.onSortTypeChanged("id")}>Default</a>*/}
                        <a href="#alpha" className={props.sortType === "text" ? "selected-a" : ""}
                           onClick={() => props.onSortTypeChanged("text")}>Alphabetic</a>
                        <a href="#priority"className={props.sortType === "priority" ? "selected-a" : ""}
                           onClick={() => props.onSortTypeChanged("priority")}>Priority</a>
                        <a href="#date" className={props.sortType === "creationDate" ? "selected-a" : ""}
                           onClick={() => props.onSortTypeChanged("creationDate")}>Creation date</a>
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
                                            modalDisplayed={props.modalDisplayed}
                                            {...item} />)
            }
        </div>
    );
}

export default TaskList;