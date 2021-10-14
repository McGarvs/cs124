import './styles/Header.css';
import {useState} from 'react';

function Header(props) {
    const [text, setText] = useState("");
    return (
        <div id="header">
            <div id="add-new-item">
                <input type="text" id="input-field" placeholder="Enter a task here!" value={text}
                       onChange={(e) => setText(e.target.value)}/>
                <div id="add-btn" onClick={() => {
                    if (text !== ""){
                        props.onAddBtnClick(text);
                        setText("");
                    }
                }
                }>Add Item</div>
            </div>
                {props.showCompleted ?
                    <div id="master-options">
                        <div id="show-completed-btn" onClick={props.onShowBtnClick}>Hide Completed</div>
                        <div id="dlt-all-btn" onClick={props.onDelCompletedModalDisplay}>Delete Completed</div>
                    </div>
                :
                    <div id="master-options">
                        <div id="show-completed-btn" onClick={props.onShowBtnClick}>Show Completed</div>
                    </div>
                }


        </div>
    );
}

export default Header;