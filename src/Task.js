import './styles/Task.css';
import {useState} from 'react';
import editIcon from './static/edit-icon.png';
import deleteIcon from './static/delete-icon.png';

function repeatString(str, numTimes) {
    let result = "";
    while (numTimes > 0) {
        result += str;
        numTimes--;
    }
    return result;
}

function Task(props) {
    const [priority, setPriority] = useState(props.priority)
    const [text, setText] = useState(props.text);
    const [completed, setCompleted] = useState(props.isCompleted);
    const [editing, setEditing] = useState(false);

    function changePriority(newPriority) {
        setPriority(newPriority);
    }

    return (
        <div className="task-container" style={{flexWrap: editing ? "wrap" : "nowrap"}}>
            <div className="item-info">
                <button className="unchecked-checkbox-btn"
                        tabIndex={props.modalDisplayed ? "-1" : "0"}
                        aria-label={completed ? "Task currently completed. Select to mark task uncompleted" : "Task currently uncompleted. Select to mark task completed"}
                        onClick={(e) => {
                            props.onItemChanged(props.id, "isCompleted", !completed);
                            setCompleted(!completed);
                        }
                        }>
                    {completed && <div className="checked-checkbox"></div>}
                </button>
                {editing ? <input type="text" className="edit-field" value={text} maxLength="80"
                                  tabIndex={props.modalDisplayed ? "-1" : ""}
                                  onFocus={(e) => {
                                      e.target.select()
                                  }}
                                  onChange={(e) => setText(e.target.value)} autoFocus/>
                    :
                    <div className="task-content">
                        <div className="task-text">
                            {<div className="priority">
                                {repeatString("!", priority)+repeatString(" ", (3-priority))}</div>}
                            {text}
                        </div>
                        <div className="task-date">{props.creationDate}</div>
                    </div>
                }
            </div>
            {editing ?
                <button className={(text !== "") ? "save-btn-active text-btn btn-enabled" :
                    "save-btn-disabled text-btn btn-disabled"}
                        tabIndex={props.modalDisplayed || text === "" ? "-1" : ""}
                        aria-label="Save task edits"
                        onClick={(e) => {
                            props.onItemChanged(props.id, "text", text);
                            props.onItemChanged(props.id, "priority", priority);
                            setEditing(false);
                        }}>Save</button>
                :
                <div className="item-edit-dlt">
                    <button className="edit-btn"
                            tabIndex={props.modalDisplayed ? "-1" : ""}
                            aria-label="Edit task"
                            onClick={(e) => {
                                setEditing(true);
                            }}>
                        <img src={editIcon} alt="edit"/>
                    </button>
                    <button className="dlt-btn"
                            tabIndex={props.modalDisplayed ? "-1" : ""}
                            aria-label="Delete task"
                            onClick={(e) => {
                                props.onDeleteID(props.id);
                                props.onDeleteModalDisplay(true);
                            }}>
                        <img src={deleteIcon} alt="delete"/>
                    </button>
                </div>
            }
            {/*TODO: Refactor to be a function instead*/}
            {editing &&
            <div className="priority-btn-container">
                <button className={priority === 0 ? "selected-priority-btn" : ""}
                        tabIndex={props.modalDisplayed ? "-1" : ""}
                        aria-label="No priority"
                        onClick={() => changePriority(0)}>None
                </button>
                <button className={priority === 1 ? "selected-priority-btn" : ""}
                        tabIndex={props.modalDisplayed ? "-1" : ""}
                        aria-label="Lowest priority"
                        onClick={() => changePriority(1)}>!
                </button>
                <button className={priority === 2 ? "selected-priority-btn" : ""}
                        tabIndex={props.modalDisplayed ? "-1" : ""}
                        aria-label="Middle priority"
                        onClick={() => changePriority(2)}>!!
                </button>
                <button className={priority === 3 ? "selected-priority-btn" : ""}
                        tabIndex={props.modalDisplayed ? "-1" : ""}
                        aria-label="Highest priority"
                        onClick={() => changePriority(3)}>!!!
                </button>
            </div>
            }

        </div>
    );
}

export default Task
;