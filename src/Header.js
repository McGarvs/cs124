import './styles/Header.css';
import {useEffect, useState} from 'react';

function Header(props) {
    const [text, setText] = useState("");
    const [haveCompleted, setHaveCompleted] = useState(null);

    useEffect(() => {
        const completedData = props.data.filter((task) => task.isCompleted)
        if (completedData.length > 0) {
            setHaveCompleted(true);
        } else {
            setHaveCompleted(false);
        }
    }, [props.data])

    return (
        <div id="header">
            <div id="header-top">
                <div id="header-title">
                    My Tasks
                </div>
                {haveCompleted &&
                (props.showCompleted ?
                    <div id="master-options">
                        <div id="show-completed-btn" onClick={props.onShowBtnClick}>Hide Completed</div>
                        <div id="dlt-all-btn" onClick={props.onDelCompletedModalDisplay}>Delete Completed</div>
                    </div>
                    :
                    <div id="master-options">
                        <div id="show-completed-btn" onClick={props.onShowBtnClick}>Show Completed</div>
                    </div>)
                }
            </div>

            <div id="add-new-item">
                <input type="text" id="input-field" placeholder="Enter a task here!" value={text} maxLength="80"
                       onChange={(e) => setText(e.target.value)}/>
                <div id="add-btn" onClick={() => {
                    if (text !== "") {
                        props.onAddBtnClick(text);
                        setText("");
                    }
                }
                }>+
                </div>
            </div>
        </div>
    );
}

export default Header;