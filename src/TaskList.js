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

    function handleEnterPress(e, sortType){
        e.preventDefault();
        if (e.which === 13) {
            props.onSortTypeChanged(sortType);
            toggleDropdown();
        }
    }

    return (
        <div id="tasklist-container">
            {currentListDisplayed &&
            <div id="navigation-container">
                <button id="home-btn" tabIndex={props.modalDisplayed ? "-1" : ""}
                        className="text-btn btn-enabled"
                        onClick={() => props.onCurrentListChanged("")}>Home
                </button>
                <p id="list-owner">
                    List Owner: {props.currentListOwnerEmail}
                </p>
                <button id="share-btn" tabIndex={props.modalDisplayed ? "-1" : ""}
                        className="text-btn btn-enabled"
                        onClick={() => props.onSharedWithModalDisplay(true)}>Share
                </button>
            </div>}
            <div id="title-container">
                <div id="title">
                    {props.currentListName}
                    <Lists allLists={props.allLists}
                           user={props.user}
                           currentListOwnerEmail={props.currentListOwnerEmail}
                           createNewList={props.createNewList}
                           currentListId={props.currentListId}
                           onCurrentListChanged={props.onCurrentListChanged}
                           onDelListModalDisplay={props.onDelListModalDisplay}
                           modalDisplayed={props.modalDisplayed}/>
                </div>
                <div className="dropdown">
                    <button className={(filteredData.length !== 0) ? "sort-btn-active text-btn btn-enabled":
                        "sort-btn-disabled text-btn btn-disabled"}
                            onClick={toggleDropdown} tabIndex={props.modalDisplayed ? "-1" : ""}
                            onKeyDown={(e) => (filteredData.length === 0) && e.preventDefault()}>Sort
                    </button>
                    {showSortDropdown && <div className="dropdown-content">
                        <a className={props.sortType === "text" ? "selected-a" : ""}
                           tabIndex={props.modalDisplayed ? "-1" : "0"}
                           onKeyUp={(e) => handleEnterPress(e, "text") }
                           onClick={() => props.onSortTypeChanged("text")}>Alphabetic</a>
                        <a className={props.sortType === "priority" ? "selected-a" : ""}
                           tabIndex={props.modalDisplayed ? "-1" : "0"}
                           onKeyUp={(e) => handleEnterPress(e, "priority") }
                           onClick={() => props.onSortTypeChanged("priority")}>Priority</a>
                        <a className={props.sortType === "creationDate" ? "selected-a" : ""}
                           tabIndex={props.modalDisplayed ? "-1" : "0"}
                           onKeyUp={(e) => handleEnterPress(e, "creationDate") }
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