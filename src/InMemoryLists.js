import './styles/InMemoryList.css';
import InMemoryApp from './InMemoryApp';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";
import Lists from "./Lists";

const firebaseConfig = {
    apiKey: "AIzaSyDGHngb4moL3bpSKohoDA3nUtkfC8YMwp4",
    authDomain: "cs124-todoapp.firebaseapp.com",
    projectId: "cs124-todoapp",
    storageBucket: "cs124-todoapp.appspot.com",
    messagingSenderId: "1003386478804",
    appId: "1:1003386478804:web:6886eadb538dce12189b41",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "Danica-McGarvs-HMCcs124"
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function InMemoryLists() {
    const [currentListId, setCurrentListId] = useState("");
    const [currentListName, setCurrentListName] = useState("");
    const query = db.collection(collectionName).orderBy("id");
    const [value, loading, error] = useCollection(query);
    let allLists = [];

    if (value !== undefined) {
        for (const doc of value.docs) {
            allLists.push(doc.data());
        }
    }

    function handleListAdded(myName) {
        const newList = {
            id: generateUniqueID(),
            name: myName,
        }
        const docRef = db.collection(collectionName).doc(newList.id);
        docRef.set(newList);
    }

    function handleCurrentListDelete() {
        const docRef = db.collection(collectionName).doc(currentListId);
        docRef.delete();
        setCurrentListId("");
        setCurrentListName("");
    }

    function handleCurrentListChanged(id) {
        setCurrentListId(id);
        let currentList = allLists.filter(currList => currList.id === id);
        if (currentList.length > 0) {
            setCurrentListName(currentList[0].name);
        } else {
            setCurrentListName("");
        }
    }

    return (
        <div>
                {(currentListId === "") ?
                    <div>
                        <div id="landing-header">
                            <div id="landing-header-heading">
                                My Tasks App
                            </div>
                        </div>
                        <div id="landing-content">
                            <Lists allLists={allLists}
                                   createNewList={handleListAdded}
                                   onCurrentListChanged={handleCurrentListChanged}
                                   currentListId={currentListId}
                                   modalDisplayed={false}/>
                        </div>
                    </div>
                    : <InMemoryApp db={db} collectionName={collectionName}
                                   auth={auth} googleProvider={googleProvider}
                                   currentListId={currentListId}
                                   currentListName={currentListName}
                                   collectionRef={db.collection(collectionName)}
                                   allLists={allLists}
                                   createNewList={handleListAdded}
                                   onCurrentListDelete={handleCurrentListDelete}
                                   onCurrentListChanged={handleCurrentListChanged}/>
                }
        </div>
    );
}

export default InMemoryLists;