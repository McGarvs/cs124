import './styles/InMemoryApp.css';
import App from './App';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",
    authDomain: "cs124-fall2021.firebaseapp.com",
    projectId: "cs124-fall2021",
    storageBucket: "cs124-fall2021.appspot.com",
    messagingSenderId: "264318304667",
    appId: "1:264318304667:web:4be8d27a02811b1ccd613e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "dylan-danica-lab"

function InMemoryApp(props) {
    const query = db.collection(collectionName);    // Fill in query here
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
        const completedTasksQuery = db.collection(collectionName).where('isCompleted', '==', 'true').get()
        completedTasksQuery.then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            })
        })
    }

    function handleSortTypeChange(newType) {
        console.log(newType);
        const query = db.collection(collectionName);
        query.orderBy(newType, "desc");
    }

    return (
        <div>
            {loading ? <div id="loading">Loading...</div> :
                <App data={taskData} onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                     onItemDeleted={handleItemDeleted} deleteCompleted={handleDeleteCompleted}
                     OnSortTypeChanged={handleSortTypeChange}/>}
        </div>
    );
}

export default InMemoryApp;