import './styles/InMemoryApp.css';
import App from './App';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";

function InMemoryApp(props) {
    const [sortType, setSortType] = useState("id")
    const [sortDir, setSortDir] = useState("desc");
    const db = props.db;
    const collectionName = props.collectionName;
    const query = db.collection(collectionName).doc(props.currentListId).collection('Tasks').orderBy(sortType, sortDir);
    const [value, loading, error] = useCollection(query);

    let taskData = [];
    if (value !== undefined) {
        for (const doc of value.docs) {
            taskData.push(doc.data());
        }
    }

    function handleItemChanged(itemID, field, newValue) {
        const docRef = db.collection(collectionName).doc(props.currentListId).collection('Tasks').doc(itemID);
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
        const docRef = db.collection(collectionName).doc(props.currentListId).collection('Tasks').doc(newItem.id);
        docRef.set(newItem);
    }

    function handleItemDeleted(itemID) {
        const docRef = db.collection(collectionName).doc(props.currentListId).collection('Tasks').doc(itemID);
        docRef.delete();
    }

    function handleDeleteCompleted() {
        const ref = db.collection(collectionName).doc(props.currentListId).collection('Tasks')
        ref.where('isCompleted', '==', true).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                ref.doc(doc.id).delete()
            })
        })
    }

    function handleSortTypeChange(newType) {
        setSortType(newType);
        if (newType === "text") {
            setSortDir("asc");
        } else {
            setSortDir("desc");
        }
    }

    return (
        <div>
            {loading ? <div id="loading">Loading...</div> :
                <App data={taskData} onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                     onItemDeleted={handleItemDeleted} onDeleteCompleted={handleDeleteCompleted}
                     sortType={sortType} onSortTypeChanged={handleSortTypeChange}
                     allLists={props.allLists} createNewList={props.createNewList}
                     currentListId={props.currentListId}
                     onCurrentListChanged={props.onCurrentListChanged}
                />}
        </div>
    );
}

export default InMemoryApp;