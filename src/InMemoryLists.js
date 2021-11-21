// import './styles/InMemoryApp.css';
import InMemoryApp from './InMemoryApp';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";
import Lists from "./Lists";

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

function InMemoryLists() {
    const [currentListId, setcurrentListId] = useState(null);
    const query = db.collection(collectionName).orderBy("id");
    const [value, loading, error] = useCollection(query);
    let allLists = [];

    if (value !== undefined) {
        for (const doc of value.docs) {
            allLists.push(doc.data());
        }
        console.log("Data:", allLists[0]);
    }

    function handleListAdded(myName) {
        const newList = {
            id: generateUniqueID(),
            name: myName,
        }
        const docRef = db.collection(collectionName).doc(newList.id);
        docRef.set(newList);
        // const subDocRef = db.collection(collectionName).doc(taskListId);
        // subDocRef.set(newList);
    }

    function handleListDeleted(listId) {
        const docRef = db.collection(collectionName).doc(listId);
        console.log("DELETE", listId)
        docRef.delete();
    }

    function handleCurrentListChanged(id) {
        setcurrentListId(id);
    }

    return (
        <div>
            {(!currentListId) ? <Lists allLists={allLists}
                                      createNewList={handleListAdded}
                                      onCurrentListChanged={handleCurrentListChanged}
                                      modalDisplayed={false}/>
            : <InMemoryApp db={db} collectionName={collectionName} currentListId={currentListId}
                           allLists={allLists}
                           createNewList={handleListAdded}
                           onCurrentListChanged={handleCurrentListChanged}/>
            }
        </div>
    );
}

export default InMemoryLists;