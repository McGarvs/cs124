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
        return <div>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In" user={user}/>
                <SignUp key="Sign Up"/>
            </TabList>
        </div>
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
                <button className="text-btn btn-enabled" onClick={props.onFormSubmit}>
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
        <div id="signin-btns">
            <button id="test-signin-btn" className="text-btn btn-enabled" onClick={() =>
                signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Sign in with test user
            </button>
            <button id="google-signin-btn" className="text-btn btn-enabled" onClick={() =>
                auth.signInWithPopup(googleProvider)}>Sign in with Google
            </button>
        </div>
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
        {/* Creates a test user (already done)*/}
        {/*<button onClick={() =>*/}
        {/*    createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>*/}
        {/*    Create test user*/}
        {/*</button>*/}
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
    // TODO: combine these currentList... state variables?
    const [currentListId, setCurrentListId] = useState("");
    const [currentListName, setCurrentListName] = useState("");
    const [currentListOwnerEmail, setCurrentListOwnerEmail] = useState("");
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
            ownerEmail: props.user.email,
        }
        const docRef = db.collection(collectionName).doc(newList.id);
        docRef.set(newList).catch((error) => {
            console.error("Error creating list: ", error);
        });
    }

    function handleSharedPermsChanged(action, listID, newValue) {
        const docRef = db.collection(collectionName).doc(listID);
        if (action === "add" && !currentSharedEmails.includes(newValue)) {
            currentSharedEmails.push(newValue);
        } else if (action === "delete") { // delete email that this list shared with
                const index = currentSharedEmails.indexOf(newValue);
                if (index > -1) {
                    currentSharedEmails.splice(index, 1);
                }
        }
        docRef.update("sharedWith", currentSharedEmails);

        // TODO: handle case where user tries to add a duplicate email
        if (action === "add" && !currentSharedEmails.includes(newValue)) {
        }
    }

    function handleCurrentListDelete() {
        // can only delete if user is the owner of current list
        const docRef = db.collection(collectionName).doc(currentListId);
        if (props.user.email === currentListOwnerEmail) {
            docRef.delete();
            setCurrentListId("");
            setCurrentListName("");
            setCurrentListOwnerEmail("");
        } else {
            // TODO: handle non-owners trying to delete current list
            // handleSharedPermsChanged("delete", currentListId, props.user.email);
        }
    }

    function handleCurrentListChanged(id) {
        setCurrentListId(id);
        let currentList = allLists.filter(currList => currList.id === id);
        if (currentList.length > 0) {
            setCurrentListName(currentList[0].name);
            setCurrentListOwnerEmail(currentList[0].ownerEmail)
            setCurrentSharedEmails(currentList[0].sharedWith);
            console.log("Current list;", currentList);
            console.log("blah:", currentListOwnerEmail);
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
                        <div id="landing-header-title">
                            My Tasks App
                        </div>
                        <div id="landing-header-user">
                            Logged in as: {props.user.displayName || props.user.email}
                        </div>
                        <div id="landing-header-options">
                            {!props.emailVerified &&
                            <button id="verify-email-btn" className="text-btn btn-enabled"
                                    type="button" onClick={props.verifyEmail}>Verify email</button>
                            }
                            <button id="signout-btn" className="text-btn btn-enabled"
                                    type="button" onClick={() => props.signOut()}>Logout</button>
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
                               user={props.user}
                               currentListId={currentListId}
                               currentListName={currentListName}
                               currentListOwnerEmail={currentListOwnerEmail}
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