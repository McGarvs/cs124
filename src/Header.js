import './styles/Header.css';
import {useState} from 'react';

function Header(props) {
    const [text, setText] = useState("");
    return (
        <div id="header">
            <div id="add-new-item">
                <input type="text" id="input-field" placeholder="Enter a task here!" value={text}
                       onChange={(e) => setText(e.target.value)}/>
                <div id="add-btn" onClick={() => props.onAddBtnClick(text)}>Add Item</div>
            </div>
            <div id="master-options">
                {/* Change to use Ternary Op instead (?) */}
                {props.showCompleted ?
                <div id="show-uncompleted-btn" onClick={props.onShowBtnClick}>Show All</div>
                :<div id="show-uncompleted-btn" onClick={props.onShowBtnClick}>Show Completed</div>}
                <div id="dlt-all-btn" onClick={props.onDelCompletedClick}>Delete Completed</div>
            </div>
        </div>
    );
}

export default Header;