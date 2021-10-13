import App from './App';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function InMemoryApp(props) {
    const [data, setData] = useState(props.initialData);

    function handleItemChanged(itemID, field, newValue) {
        console.log("changing item for ID: ", itemID, " ", field, ": ", newValue);
        setData(data.map((item) =>
            (item.id === itemID) ? {...item, [field]: newValue} : {...item}
        ));
    }

    function handleItemAdded(text, isCompleted = false) {
        console.log("Adding: ", text)
        setData(data.push({
            id: generateUniqueID(),
            text: text,
            isCompleted: isCompleted,
        }))
    }

    function handleItemDeleted(itemID) {
        console.log("deleting item with id: ", itemID)
        setData(data.filter((item) => {
            console.log("current item id: ", item.id)
            return item.id !== itemID;
        }));
    }

    function handleDeleteCompleted() {
        console.log("Deleting Completed")
        setData(data.filter((item) => {
            return item.isCompleted !== true
        }));
    }

    return (<App data={data} onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                 onItemDeleted={handleItemDeleted} deleteCompleted={handleDeleteCompleted}/>);
}

export default InMemoryApp;