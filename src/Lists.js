import {useState} from 'react';

function Lists(props) {
    const [name, setName] = useState("");
    function onFormSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            props.createNewList(name);
            setName("");
            console.log("Current Data:", props.allLists);
        }
    }
    function onSelect(id) {
        props.onCurrentListChanged(id);
    }

    return(
        <div id="lists-container">
            <select className={"lists-dropdown"}
                    tabIndex={props.modalDisplayed ? "-1" : ""}
                    onChange={(e) => onSelect(e.target.value)}>
                { (props.currentListId === "") ? <option value={""} >Choose a List</option> :
                    <option value={""} >Go To List Control</option> }
                {props.allLists.map((myList) => <option key={myList.id}
                                                               selected={(myList.id === props.currentListId)?"selected":""}
                                                               value={myList.id}>{myList.name}</option>)}
            </select>
            <br/>
            {(props.currentListId === "") &&
            <form onSubmit={onFormSubmit}>
                <input type={"text"} placeholder={"Enter a List Name"}
                       onChange={(e) => setName(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>}
            <br/>
            {(props.currentListId === "") &&
            <button type="submit" onClick={() => console.log("Delete List")}>Delete Current List</button>}

        </div>
    )
}

export default Lists;