import './styles/Header.css';
import {useState} from 'react';

function Header(props) {
    const [text, setText] = useState("");
    const haveCompleted = props.data.find((task) => task.isCompleted) !== undefined;

    function onFormSubmit(e) {
        e.preventDefault();
        if (text !== "") {
            props.onAddBtnClick(text);
            setText("");
        }
    }

    return (
        <div id="header">
            <div id="header-top">
                <div id="add-new-item">
                    <form id="add-form" onSubmit={onFormSubmit}>
                        <input type="text" id="input-field" placeholder="Enter a task here!" value={text} maxLength="80"
                               tabIndex={props.modalDisplayed ? "-1" : ""}
                               onChange={(e) => setText(e.target.value)}
                               />
                        <button type="submit" id={(text !== "")?"add-btn-active":"add-btn-disabled"}
                                tabIndex={props.modalDisplayed || (text === "") ? "-1" : ""}
                                aria-label="Create task">
                            +
                        </button>
                    </form>
                </div>
                {haveCompleted &&
                    <div id="master-options">
                        <button id="show-completed-btn" onClick={props.onShowBtnClick} tabIndex={props.modalDisplayed ? "-1" : ""}>
                            {props.showCompleted ? "Hide Completed" : "Show Completed"}
                        </button>
                        {props.showCompleted &&
                        <button id="dlt-all-btn" onClick={props.onDelCompletedModalDisplay}
                                tabIndex={props.modalDisplayed ? "-1" : ""}>Delete Completed</button>}
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;