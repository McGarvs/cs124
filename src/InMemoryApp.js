import './styles/InMemoryApp.css';
import App from './App';
import TabList from './TabList';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollection} from "react-firebase-hooks/firestore";
import {useState} from "react";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';

function InMemoryApp(props) {
    const [user, loading, error] = useAuthState(props.auth);

    function verifyEmail() {
        props.auth.currentUser.sendEmailVerification();
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            {user.displayName || user.email}
            <SignedInApp {...props} user={user}/>
            <button type="button" onClick={() => props.auth.signOut()}>Logout</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In" auth={props.auth} googleProvider={props.googleProvider}/>
                <SignUp key="Sign Up" auth={props.auth}/>
            </TabList>
        </>
    }
}

const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';


function SignIn(props) {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(props.auth);

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
            props.auth.signInWithPopup(props.googleProvider)}>Login with Google
        </button>
    </div>
}

function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(props.auth);

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

function SignedInApp(props) {
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
        docRef.set(newItem);
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

                <App data={taskData} onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                onItemDeleted={handleItemDeleted} onDeleteCompleted={handleDeleteCompleted}
                sortType={sortType} onSortTypeChanged={handleSortTypeChange}
                allLists={props.allLists} createNewList={props.createNewList}
                currentListId={props.currentListId}
                currentListName={props.currentListName}
                onCurrentListChanged={props.onCurrentListChanged}
                onCurrentListDelete={handleDeleteAll}
                />
                }
        </div>
    );
}

export default InMemoryApp;