import './Task.css';
import checkmarkImage from './static/checkmark.png';
import {useState} from 'react';

function Task(props) {
    const [completed, setCompleted] = useState(props.isCompleted);

    return (
        <div className="task-container">
            <div className="item-info">
                <div className="checkbox-btn">
                    <div onClick={(e) => {
                        props.onCompletedChanged(props.id, "isCompleted", !completed);
                        setCompleted(!completed);
                    }
                    } className={completed ? "checked-checkbox-btn" : "unchecked-checkbox-btn"}>
                        {completed && <img src={checkmarkImage} alt="checkmark"/>}
                    </div>
                </div>
                <div className="text-content">{props.text}</div>
            </div>
            <div className="item-edit-dlt">
                <div className="edit-btn">Edit</div>
                <div className="dlt-btn">Delete</div>
            </div>
        </div>

    );
}

export default Task
;