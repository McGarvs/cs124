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
                     onClick={(e) => {
                         props.onItemChanged(props.id, "isCompleted", !completed);
                         setCompleted(!completed);
                     }
                     }>
                    {completed && <div className="checked-checkbox"></div>}
                </button>
                {editing ? <input type="text" className="edit-field" value={text} maxLength="80"
                                  onFocus={(e) => {e.target.select()}}
                                  onChange={(e) => setText(e.target.value)} autoFocus/>
                    :
                    <div className="task-content">
                        <div className="task-text">
                            {priority !== 0 && <div className="priority">
                                {repeatString("!", priority)}
                            </div>}
                            {text}
                        </div>
                        <div className="task-date">{props.creationDate}</div>
                    </div>
                }
            </div>
            {editing ?
                <button className={(text !== "")?"save-btn-active":"save-btn-disabled"}
                     onClick={(e) => {
                    props.onItemChanged(props.id, "text", text);
                    props.onItemChanged(props.id, "priority", priority);
                    setEditing(false);
                }}>Save</button>
                :
                <div className="item-edit-dlt">
                    <button className="edit-btn" onClick={(e) => {
                        setEditing(true);
                    }}>
                        <img src={editIcon} alt="edit"/>
                    </button>
                    <button className="dlt-btn" onClick={(e) => {
                        props.onDeleteID(props.id);
                        props.onDeleteModalDisplay(true);
                    }}>
                        <img src={deleteIcon} alt="delete"/>
                    </button>
                </div>
            }

            {editing &&
            <div className="priority-btn-container">
                <button className={priority === 0 ? "selected-priority-btn" : ""} onClick={() => changePriority(0)}>None
                </button>
                <button className={priority === 1 ? "selected-priority-btn" : ""} onClick={() => changePriority(1)}>!
                </button>
                <button className={priority === 2 ? "selected-priority-btn" : ""} onClick={() => changePriority(2)}>!!
                </button>
                <button className={priority === 3 ? "selected-priority-btn" : ""} onClick={() => changePriority(3)}>!!!
                </button>
            </div>
            }

        </div>
    );
}

export default Task
;