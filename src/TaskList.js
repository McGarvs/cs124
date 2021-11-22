import './styles/TaskList.css';
import Task from './Task';
import {useState} from "react";
import Lists from "./Lists";

function TaskList(props) {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const filteredData = props.data.filter((task) => props.showCompleted || !task.isCompleted);
    const currentListDisplayed = (props.currentListId !== "");

    function toggleDropdown() {
        setShowSortDropdown(!showSortDropdown);
    }

    return (
        <div id="tasklist-container">
            {currentListDisplayed &&
            <div id="home-btn-container">
                <button
                    id="home-btn" tabIndex={props.modalDisplayed ? "-1" : ""}
                    onClick={() => props.onCurrentListChanged("")}>Home
                </button>
            </div>}
            <div id="title-container">
                <div id="title">
                    {props.currentListName}
                    <Lists allLists={props.allLists}
                           createNewList={props.createNewList}
                           currentListId={props.currentListId}
                           onCurrentListChanged={props.onCurrentListChanged}
                           onDelListModalDisplay={props.onDelListModalDisplay}
                           modalDisplayed={props.modalDisplayed}/>
                </div>
                <div className="dropdown">
                    <button className={(filteredData.length !== 0) ? "sort-btn-active" : "sort-btn-disabled"}
                            onClick={toggleDropdown} tabIndex={props.modalDisplayed ? "-1" : ""}
                            onKeyDown={(e) => (filteredData.length === 0) && e.preventDefault()}>Sort
                    </button>
                    {showSortDropdown && <div className="dropdown-content">
                        <a href="#alpha" className={props.sortType === "text" ? "selected-a" : ""}
                           tabIndex={props.modalDisplayed ? "-1" : ""}
                           onClick={() => props.onSortTypeChanged("text")}>Alphabetic</a>
                        <a href="#priority" className={props.sortType === "priority" ? "selected-a" : ""}
                           tabIndex={props.modalDisplayed ? "-1" : ""}
                           onClick={() => props.onSortTypeChanged("priority")}>Priority</a>
                        <a href="#date" className={props.sortType === "creationDate" ? "selected-a" : ""}
                           tabIndex={props.modalDisplayed ? "-1" : ""}
                           onClick={() => props.onSortTypeChanged("creationDate")}>Creation date</a>
                    </div>}
                </div>
            </div>
            {(filteredData.length === 0) ? (props.data.length > 0) ?
                    <div>Your tasks are all complete. Try clicking Show Completed above!</div>
                    : <div>Your task list is empty. Try entering a task in the form above!</div>
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