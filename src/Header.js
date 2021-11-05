import './styles/Header.css';
import {useState} from 'react';

function Header(props) {
    const [text, setText] = useState("");
    const haveCompleted = props.data.find((task) => task.isCompleted) !== undefined;

    return (
        <div id="header">
            <div id="header-top">
                <div id="add-new-item">
                    <input type="text" id="input-field" placeholder="Enter a task here!" value={text} maxLength="80"
                           onChange={(e) => setText(e.target.value)}/>
                    <button id={(text !== "")?"add-btn-active":"add-btn-disabled"} onClick={() => {
                        if (text !== "") {
                            props.onAddBtnClick(text);
                            setText("");
                        }
                    }
                    }>+
                    </button>
                </div>
                {haveCompleted &&
                    <div id="master-options">
                        <div id="show-completed-btn" onClick={props.onShowBtnClick}>
                            {props.showCompleted ? "Hide Completed" : "Show Completed"}</div>
                        {props.showCompleted &&
                        <div id="dlt-all-btn" onClick={props.onDelCompletedModalDisplay}>Delete Completed</div>}
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;