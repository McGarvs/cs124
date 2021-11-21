import {useState} from 'react';

function Lists(props) {
    const [name, setName] = useState("");
    const currentListDisplayed = (props.currentListId === "");
    function onFormSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            props.createNewList(name);
            setName("");
            console.log("Current Data:", props.allLists);
        }
    }

    return(
        <div id="lists-container">
            <select className={"lists-dropdown"}
                    tabIndex={props.modalDisplayed ? "-1" : ""}
                    onChange={(e) => props.onCurrentListChanged(e.target.value)}>
                { currentListDisplayed ? <option value={""} >Choose a List</option> :
                    <option value={""} >Add a New List</option> }
                {props.allLists.map((myList) => <option key={myList.id}
                                                        selected={(myList.id === props.currentListId)?"selected":""}
                                                        value={myList.id}>{myList.name}</option>)}
            </select>

            {currentListDisplayed &&
            <form onSubmit={onFormSubmit}>
                <input type={"text"} placeholder={"Enter a List Name"}
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