import './styles/InMemoryApp.css';
import App from './App';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";

function InMemoryApp(props) {
    const [sortType, setSortType] = useState("id")
    const [sortDir, setSortDir] = useState("desc");
    const subCollectionRef = props.collectionRef.doc(props.currentListId).collection('Tasks');
    const query = subCollectionRef.orderBy(sortType, sortDir);
    const [value, loading, error] = useCollection(query);

    let taskData = [];
    if (value !== undefined) {
        for (const doc of value.docs) {
            taskData.push(doc.data());
        }
    }

    function handleItemChanged(itemID, field, newValue) {
        const docRef = subCollectionRef.doc(itemID);
        docRef.update(field, newValue);
    }

    function handleItemAdded(text) {
        const today = new Date();
        const newItem = {
            id: generateUniqueID(),
            text: text,
            isCompleted: false,
            priority: 0,
            creationDate: today.toLocaleDateString("en-US"), // "11/02/2021" // TODO: change this
        }
        const docRef = subCollectionRef.doc(newItem.id);
        docRef.set(newItem).catch((error) => {
            console.error("Error creating task: ", error);
        });
    }

    function handleItemDeleted(itemID) {
        const docRef = subCollectionRef.doc(itemID);
        docRef.delete();
    }

    function handleDeleteCompleted() {
        taskData.map((task) => {if(task.isCompleted){subCollectionRef.doc(task.id).delete()}});
    }

    function handleSortTypeChange(newType) {
        setSortType(newType);
        if (newType === "text") {
            setSortDir("asc");
        } else {
            setSortDir("desc");
        }
    }

    function handleDeleteAll(){
        taskData.map((task) => {subCollectionRef.doc(task.id).delete()});
        console.log("DELETED Sub");
        props.onCurrentListDelete();
    }

    return (
        <div>
            {loading ? <div id="loading">Loading...</div> :

                <App data={taskData} user={props.user}
                onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                onItemDeleted={handleItemDeleted} onDeleteCompleted={handleDeleteCompleted}
                sortType={sortType} onSortTypeChanged={handleSortTypeChange}
                allLists={props.allLists} createNewList={props.createNewList}
                currentListId={props.currentListId}
                currentListName={props.currentListName}
                currentListOwnerEmail={props.currentListOwnerEmail}
                currentSharedEmails={props.currentSharedEmails}
                onCurrentListChanged={props.onCurrentListChanged}
                onCurrentListDelete={handleDeleteAll}
                onSharedPermsChanged={props.onSharedPermsChanged}
                />
                }
        </div>
    );
}

export default InMemoryApp;