import './Header.css';

function Header(props) {
    return (
        <div id="header">
            <div id="add-new-item">
                <input type="text" id="input-field" placeholder="Enter a task here!"/>
                    <div id="add-btn">Add Item</div>
            </div>
            <div id="master-options">
                <div id="show-uncompleted-btn">Show All</div>
                <div id="dlt-all-btn">Delete Completed</div>
            </div>
        </div>
    );
}

export default Header;