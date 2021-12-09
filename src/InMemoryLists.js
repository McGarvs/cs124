import './styles/InMemoryList.css';
import InMemoryApp from './InMemoryApp';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {useEffect, useState} from "react";
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
const collectionName = "TaskLists-AuthenticationRequired"
// const sharedCollectionName = "TaskLists-SharingAllowed"
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
            <SignedInApp user={user}
                         emailVerified={user.emailVerified}
                         verifyEmail={() => {
                             verifyEmail()
                         }}
                         signOut={() => {
                             auth.signOut()
                         }}
            />
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In" user={user}/>
                <SignUp key="Sign Up"/>
            </TabList>
        </>
    }
}

const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';
function SignInSignUpFields(props) {
    return (
        <form id="signup-fields">
            <div id="email-input">
                <div className="signup-field-label">Email:</div>
                <input type="text" value={props.userEmail} maxLength="80"
                       onChange={(e) => props.onUserEmailChanged(e.target.value)}
                />
            </div>
            <div id="password-input">
                <div className="signup-field-label">Password:</div>
                <input type="text" value={props.userPassword} maxLength="80"
                       onChange={(e) => props.onUserPasswordChanged(e.target.value)}
                />
            </div>
            <div id="signup-confirm-btn-container">
                <button onClick={props.onFormSubmit}>
                    {props.buttonText}
                </button>
            </div>
        </form>
    );
}

function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();
        // TODO: more error checking for email / password can go here
        if (userEmail !== "" && userPassword !== "") {
            signInWithEmailAndPassword(userEmail, userPassword);
            setUserEmail("");
            setUserPassword("");
        }
    }

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
        <SignInSignUpFields
            userEmail={userEmail}
            onUserEmailChanged={setUserEmail}
            userPassword={userPassword}
            onUserPasswordChanged={setUserPassword}
            onFormSubmit={onFormSubmit}
            buttonText={"Sign In"}
        />
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }

    function onFormSubmit(e) {
        e.preventDefault();
        // TODO: more error checking for email / password can go here
        if (userEmail !== "" && userPassword !== "") {
            createUserWithEmailAndPassword(userEmail, userPassword);
            setUserEmail("");
            setUserPassword("");
        }
    }
//bob@gmail.com, bobwashere
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <button onClick={() =>
            createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
            Create test user
        </button>
        <SignInSignUpFields
            userEmail={userEmail}
            onUserEmailChanged={setUserEmail}
            userPassword={userPassword}
            onUserPasswordChanged={setUserPassword}
            onFormSubmit={onFormSubmit}
            buttonText={"Sign Up"}
        />
    </div>
}

function SignedInApp(props) {
    const [currentListId, setCurrentListId] = useState("");
    const [currentListName, setCurrentListName] = useState("");
    const [currentSharedEmails, setCurrentSharedEmails] = useState([]);
    const myQuery = db.collection(collectionName).where("owner", "==", props.user.uid);
    const [myValue, myLoading, myError] = useCollection(myQuery); // const [value, loading, error] = useCollection(query);
    const sharedQuery = db.collection(collectionName).where("sharedWith", "array-contains", props.user.email);
    const [sharedValue, sharedLoading, sharedError] = useCollection(sharedQuery);
    let allLists = [];

    if (myValue !== undefined && !myLoading) {
        for (const doc of myValue.docs) {
            allLists.push(doc.data());
        }
    }

    if (sharedValue !== undefined && !sharedLoading) {
        for (const doc of sharedValue.docs) {
            if (!allLists.includes(doc.data())) {
                allLists.push(doc.data());
            }
        }
    }

    function handleListAdded(myName) {
        const newList = {
            id: generateUniqueID(),
            name: myName,
            sharedWith: [],
            owner: props.user.uid,
        }
        const docRef = db.collection(collectionName).doc(newList.id);
        console.log("new list... shared with: ", newList.sharedWith);
        docRef.set(newList).catch((error) => {
            console.error("Error creating list: ", error);
        });
    }

    function handleSharedPermsChanged(action, listID, newValue) {
        const docRef = db.collection(collectionName).doc(listID);
        let sharedWithList;
        docRef.get().then(doc => {
            sharedWithList = doc.data().sharedWith;
            console.log("shared with list: ", sharedWithList);
        })
        if (action === "add") { // add new email to share with
            currentSharedEmails.push(newValue);
        } else if (action === "delete") { // delete email that this list shared with
            console.log("newvalue:", newValue);
            const index = currentSharedEmails.indexOf(newValue);
            if (index > -1) {
                currentSharedEmails.splice(index, 1);
            }
            console.log("sharedWithList AFTER:", currentSharedEmails);
        }
        docRef.update("sharedWith", currentSharedEmails);
        console.log("sharedWithList AFTER2:", currentSharedEmails);
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
            setCurrentSharedEmails(currentList[0].sharedWith);
            console.log("Current list;", currentList);
        } else {
            setCurrentListName("");
            setCurrentSharedEmails([]);
        }
    }

    return (
        <div>
            {(currentListId === "") ?
                <div>
                    <div id="landing-header">
                        <div id="landing-header-options">
                            {!props.emailVerified &&
                            <button id="verify-email-btn" type="button" onClick={props.verifyEmail}>Verify
                                email</button>
                            }
                            <button id="signout-btn" type="button" onClick={() => props.signOut()}>Logout</button>
                        </div>
                        <div id="landing-header-heading">
                            My Tasks App
                        </div>
                    </div>
                    <div id="landing-content">
                        {/*<TabList>*/}
                        <Lists // key="My Lists"
                            allLists={allLists}
                            createNewList={handleListAdded}
                            onCurrentListChanged={handleCurrentListChanged}
                            currentListId={currentListId}
                            modalDisplayed={false}/>
                        {/*    <Lists key="Shared Lists"*/}
                        {/*           allLists={sharedLists}*/}
                        {/*           createNewList={handleListAdded}*/}
                        {/*           onCurrentListChanged={handleCurrentListChanged}*/}
                        {/*           currentListId={currentListId}*/}
                        {/*           modalDisplayed={false}/>*/}
                        {/*</TabList>*/}
                    </div>
                </div>
                : <InMemoryApp db={db} collectionName={collectionName}
                               auth={auth} googleProvider={googleProvider}
                               currentListId={currentListId}
                               currentListName={currentListName}
                               currentSharedEmails={currentSharedEmails}
                               collectionRef={db.collection(collectionName)}
                               allLists={allLists}
                               createNewList={handleListAdded}
                               onCurrentListDelete={handleCurrentListDelete}
                               onCurrentListChanged={handleCurrentListChanged}
                               onSharedPermsChanged={handleSharedPermsChanged}
                />
            }
        </div>
    );
}

export default InMemoryLists;