import './styles/InMemoryList.css';
import InMemoryApp from './InMemoryApp';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";
import Lists from "./Lists";
import TabList from './TabList';
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';

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
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        auth.currentUser.sendEmailVerification();
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            {user.displayName || user.email}
            <SignedInApp user={user}/>
            <button type="button" onClick={() => auth.signOut()}>Logout</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In" />
                <SignUp key="Sign Up" />
            </TabList>
        </>
    }
}

const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';

function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        {error && <p>"Error logging in: " {error.message}</p>}
        <button onClick={() =>
            signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Login with test user Email/PW
        </button>
        <button onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <button onClick={() =>
            createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
            Create test user
        </button>

    </div>
}

function SignedInApp() {
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