import './styles/Lists.css';
import dropdownIcon from './static/dropdown-icon.png';
import deleteIcon from './static/delete-icon.png';
import {useState} from 'react';

function Lists(props) {
    const [name, setName] = useState("");
    const [showListDropdown, setShowListDropdown] = useState(false);
    const currentListDisplayed = (props.currentListId !== "");
    function onFormSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            props.createNewList(name);
            setName("");
            console.log("Current Data:", props.allLists);
        }
    }
    function toggleDropdown() {
        setShowListDropdown(!showListDropdown);
    }

    return(
        <div id="lists-container">
            <div className={!currentListDisplayed ? "home-lists-dropdown" : "lists-dropdown home-lists-dropdown"}>
                <button onClick={toggleDropdown}>
                    {currentListDisplayed ?
                        <img src={dropdownIcon} alt="list dropdown"/>
                        :
                        (props.allLists.length !== 0) ?"Choose a List" : "No Lists Exist"}</button>
                {showListDropdown && <div className="lists-dropdown-content">
                    {props.allLists.map((myList) => <a key={myList.id}
                                                        className={(myList.id === props.currentListId)?"list-unselected list-selected":"list-unselected"}
                                                        onClick={() => props.onCurrentListChanged(myList.id)}>{myList.name}</a>)}
                </div>}
            </div>
            {!currentListDisplayed &&
                <div id="add-new-list">
                    <form id="add-list-form" onSubmit={onFormSubmit}>
                        <input id="input-list-field" value={name}
                               type={"text"} placeholder={"Enter a new list name..."} maxLength="16"
                               tabIndex={props.modalDisplayed ? "-1" : ""}
                               onChange={(e) => setName(e.target.value)}/>
                        <button id="add-list-btn-active" type="submit">+</button>
                    </form>
                </div>
            }
            {currentListDisplayed &&
            <button className="delete-list-btn"
                    type="submit" tabIndex={props.modalDisplayed ? "-1" : ""}
                    onClick={(e) => {props.onDelListModalDisplay(true)}}>
                <img src={deleteIcon} alt="delete"/>
            </button>}
        </div>
    )
}

export default Lists;