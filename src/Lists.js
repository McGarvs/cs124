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
    function onSelect(index) {
        const id = props.allLists[index].id;
        props.onCurrentListChanged(id);
    }

    return(
        <div id="selectList-container">
            <select className={"lists-dropdown"}
                    tabIndex={props.modalDisplayed ? "-1" : ""}
                    onChange={(e) => onSelect(e.target.value)}>
                <option value={null} >Create or Choose a List</option>
                {/*TODO: Change from text to Name once Lists implemented*/}
                {props.allLists.map((myList, index) => <option key={myList.id}
                                                               selected={(myList.id === props.currentListId)?"selected":""}
                                                               value={index}>{myList.name}</option>)}
            </select>
            <br/>
            <form onSubmit={onFormSubmit}>
                <input type={"text"} placeholder={"Enter a List Name"}
                       onChange={(e) => setName(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Lists;