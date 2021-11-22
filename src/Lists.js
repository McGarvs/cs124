import './styles/Lists.css';
import {useState} from 'react';

function Lists(props) {
    const [name, setName] = useState("");
    const [showListDropdown, setShowListDropdown] = useState(false);
    const currentListDisplayed = (props.currentListId === "");
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
            <div id="home-btn-container">
                {!currentListDisplayed &&
                <button
                    id="home-btn"
                    onClick={() => props.onCurrentListChanged("")}>Home</button>}
            </div>
            <div className="lists-dropdown">
                <button onClick={toggleDropdown}>
                    {(props.allLists.length !== 0) ?"Choose a List" : "No Lists Exist"}</button>
                {showListDropdown && <div className="lists-dropdown-content">
                    {props.allLists.map((myList) => <a key={myList.id}
                                                        className={(myList.id === props.currentListId)?"list-unselected list-selected":"list-unselected"}
                                                        onClick={() => props.onCurrentListChanged(myList.id)}>{myList.name}</a>)}
                </div>}
            </div>
            <br/>
            {/*<select className={"lists-dropdown"}*/}
            {/*        tabIndex={props.modalDisplayed ? "-1" : ""}*/}
            {/*        onChange={(e) => props.onCurrentListChanged(e.target.value)}>*/}
            {/*    { (currentListDisplayed ) ? (props.allLists.length !== 0) ?*/}
            {/*        <option value={""} >Choose a List</option>:*/}
            {/*        <option value={""} >No Lists Exist</option>:*/}
            {/*        <option value={""} >Add a New List</option>}*/}
            {/*    {props.allLists.map((myList) => <option key={myList.id}*/}
            {/*                                            selected={(myList.id === props.currentListId)?"selected":""}*/}
            {/*                                            value={myList.id}>{myList.name}</option>)}*/}
            {/*</select>*/}
            {currentListDisplayed &&
            <form onSubmit={onFormSubmit}>
                <input type={"text"} placeholder={"Enter a List Name"} maxLength="80"
                       tabIndex={props.modalDisplayed ? "-1" : ""}
                       onChange={(e) => setName(e.target.value)}/>
                <button type="submit">+</button>
            </form>}

            {(!currentListDisplayed) &&
            <button type="submit" tabIndex={props.modalDisplayed ? "-1" : ""}
                    onClick={(e) => {props.onDelListModalDisplay(true)}}>Delete Current List</button>}
        </div>
    )
}

export default Lists;