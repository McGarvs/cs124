import './styles/Header.css';
import {useState} from 'react';

function Header(props) {
    const [text, setText] = useState("");
    const haveCompleted = props.data.find((task) => task.isCompleted) !== undefined;

    // function handleAddTask() {
    //
    // }

    function onFormSubmit(e) {
        e.preventDefault();
        if (text !== "") {
            props.onAddBtnClick(text);
            setText("");
        }
    }
    // onClick={() => handleAddTask()}
    return (
        <div id="header">
            <div id="header-top">
                <div id="add-new-item">
                    <form id="add-form" onSubmit={onFormSubmit}>
                        <input type="text" id="input-field" placeholder="Enter a task here!" value={text} maxLength="80"
                               onChange={(e) => setText(e.target.value)}
                               />
                        <button type="submit" id={(text !== "")?"add-btn-active":"add-btn-disabled"} >
                            +
                        </button>
                    </form>
                </div>
                {haveCompleted &&
                    <div id="master-options">
                        <button id="show-completed-btn" onClick={props.onShowBtnClick}>
                            {props.showCompleted ? "Hide Completed" : "Show Completed"}</button>
                        {props.showCompleted &&
                        <button id="dlt-all-btn" onClick={props.onDelCompletedModalDisplay}>Delete Completed</button>}
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;