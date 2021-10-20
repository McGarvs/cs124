import App from './App';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// import firebase from "firebase/compat";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",
//     authDomain: "cs124-fall2021.firebaseapp.com",
//     projectId: "cs124-fall2021",
//     storageBucket: "cs124-fall2021.appspot.com",
//     messagingSenderId: "264318304667",
//     appId: "1:264318304667:web:4be8d27a02811b1ccd613e"
// };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

function InMemoryApp(props) {
    const [data, setData] = useState(props.initialData);

    function handleItemChanged(itemID, field, newValue) {
        // console.log("changing item for ID: ", itemID, " ", field, ": ", newValue);
        setData(data.map((item) =>
            (item.id === itemID) ? {...item, [field]: newValue} : {...item}
        ));
    }

    function handleItemAdded(text) {
        // console.log("adding: ", text)
        const newItem = {
            id: generateUniqueID(),
            text: text,
            isCompleted: false,
        }
        setData((data) => [...data, newItem])
    }

    function handleItemDeleted(itemID) {
        // console.log("deleting item with id: ", itemID)
        setData(data.filter((item) => {
            // console.log("current item id: ", item.id)
            return item.id !== itemID;
        }));
    }

    function handleDeleteCompleted() {
        // console.log("Deleting Completed")
        setData(data.filter((item) => {
            return item.isCompleted !== true
        }));
    }

    return (<App data={data} onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                 onItemDeleted={handleItemDeleted} deleteCompleted={handleDeleteCompleted}/>);
}

export default InMemoryApp;