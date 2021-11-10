import './styles/InMemoryApp.css';
import App from './App';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
    authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
    projectId: "hmc-cs124-fa21-labs",
    storageBucket: "hmc-cs124-fa21-labs.appspot.com",
    messagingSenderId: "949410042946",
    appId: "1:949410042946:web:0113b139a7e3cd1cc709db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "Danica-McGarvs-HMCcs124-labs"

function InMemoryApp() {
    const [sortType, setSortType] = useState("id")
    const [sortDir, setSortDir] = useState("desc");
    const query = db.collection(collectionName).orderBy(sortType, sortDir);
    const [value, loading, error] = useCollection(query);
    let taskData = [];

    if (value !== undefined) {
        for (const doc of value.docs) {
            taskData.push(doc.data());
        }
    }

    function handleItemChanged(itemID, field, newValue) {
        const docRef = db.collection(collectionName).doc(itemID);
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
        const docRef = db.collection(collectionName).doc(newItem.id);
        docRef.set(newItem);
    }

    function handleItemDeleted(itemID) {
        const docRef = db.collection(collectionName).doc(itemID);
        docRef.delete();
    }

    function handleDeleteCompleted() {
        const ref = db.collection(collectionName)
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
                     sortType={sortType} onSortTypeChanged={handleSortTypeChange}/>}
        </div>
    );
}

export default InMemoryApp;