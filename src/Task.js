import './styles/Task.css';
import checkmarkImage from './static/checkmark.png';
import {useState} from 'react';

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
                        {completed && <img src={checkmarkImage} alt="checkmark"/>}
                    </div>
                </div>
                {editing ? <textarea className="edit-field" value={text}
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
                    }}>Edit
                    </div>
                    <div className="dlt-btn" onClick={(e) => {
                        props.onDeleteID(props.id);
                        props.onDeleteModalDisplay(true);
                    }}>Delete
                    </div>
                </div>
            }

        </div>
    );
}

export default Task
;