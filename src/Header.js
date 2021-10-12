import './Header.css';

function Header(props) {
    return (
        <div id="header">
            <div id="add-new-item">
                <input type="text" id="input-field" placeholder="Enter a task here!"/>
                    <div id="add-btn">Add Item</div>
            </div>
            <div id="master-options">
                {props.showCompleted && <div id="show-uncompleted-btn" onClick={props.onShowBtnClick}>Show All</div>}
                {!(props.showCompleted) && <div id="show-uncompleted-btn" onClick={props.onShowBtnClick}>Show Completed</div>}
                <div id="dlt-all-btn" onClick={props.onDelAllBtnClick}>Delete Completed</div>
            </div>
        </div>
    );
}

export default Header;