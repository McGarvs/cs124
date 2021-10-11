import './Task.css';
import App from "./App";

function Task(props) {
    let checkboxClass = ""
    function toggleCheckbox() {
        checkboxClass = props.isCompleted ? "checked-checkbox-btn" : "checkbox-btn";
    }

    return (
        <div className="task-container">
            <div className="item-info">
                <div onClick={toggleCheckbox} className={checkboxClass}>
                    {props.isCompleted && <img src="../static/checkmark.png" alt="checkmark" />}
                </div>
                {props.text}
            </div>
            <div className="item-edit-dlt">
                <div className="edit-btn">Edit</div>
                <div className="dlt-btn">Delete</div>
            </div>
        </div>

    );
}

export default Task;