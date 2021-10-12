import './Task.css';
import checkmarkImage from './static/checkmark.png';

function Task(props) {
    function toggleCheckbox() {
    }

    return (
        <div className="task-container">
            <div className="item-info">
                <div onClick={toggleCheckbox} className={props.isCompleted ? "checked-checkbox-btn" : "checkbox-btn"}>
                    {props.isCompleted && <img src={checkmarkImage} alt="checkmark" />}
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

export default Task;