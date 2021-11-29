import './styles/InMemoryList.css';
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