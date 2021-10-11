import './Task.css';

function Task(props) {
    function toggleCheckbox() {
    }

    return (
        <div className="task-container">
            <div className="item-info">
                <div onClick={toggleCheckbox} className={props.isCompleted ? "checked-checkbox-btn" : "checkbox-btn"}>
                    {props.isCompleted && <img src="./static/checkmark.png" alt="checkmark" />}
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