import './styles/Task.css';
import {useState} from 'react';
import checkmarkIcon from './static/checkmark.png';
import editIcon from './static/edit-icon.png';
import deleteIcon from './static/delete-icon.png';

function Task(props) {
    const [text, setText] = useState(props.text);
    const [completed, setCompleted] = useState(props.isCompleted);
    const [editing, setEditing] = useState(false);

    return (
        <div className="task-container">
            <div className="item-info">
                <div className="checkbox-btn">
                    <div className={completed ? "checked-checkbox-btn" : "unchecked-checkbox-btn"}
                         onClick={(e) => {
                             props.onItemChanged(props.id, "isCompleted", !completed);
                             setCompleted(!completed);
                         }
                         }>
                        {completed && <img src={checkmarkIcon} alt="checkmark"/>}
                    </div>
                </div>
                <div className="priority">
                    !!!
                </div>
                {editing ? <input type="text" className="edit-field" value={text} maxLength="80"
                                     onChange={(e) => setText(e.target.value)} autoFocus/> : <div
                    className="text-content">{text}</div>
                }

            </div>
            {editing ?
                <div className="save-btn" onClick={(e) => {
                    props.onItemChanged(props.id, "text", text);
                    setEditing(false);
                }}>Save</div>
                :
                <div className="item-edit-dlt">
                    <div className="edit-btn" onClick={(e) => {
                        setEditing(true);
                    }}>
                        <img src={editIcon} alt="edit" />
                    </div>
                    <div className="dlt-btn" onClick={(e) => {
                        props.onDeleteID(props.id);
                        props.onDeleteModalDisplay(true);
                    }}>
                        <img src={deleteIcon} alt="delete" />
                    </div>
                </div>
            }

        </div>
    );
}

export default Task
;