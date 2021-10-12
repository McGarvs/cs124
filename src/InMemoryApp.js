import App from './App';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function InMemoryApp(props) {
    const [data, setData] = useState(props.initialData);

    function handleItemChanged(itemID, field, newValue) {
        setData(data.map((item) =>
            (item.id !== itemID) ? {...item, [field]:newValue} : {...item}
        ));
    }

    function handleItemAdded(text, isCompleted = false) {
        setData(data.push({
            id: generateUniqueID(),
            text: text,
            isCompleted: isCompleted,
        }))
    }

    function handleItemDeleted(itemID) {
        setData(data.filter((item) => {
            return item.id !== itemID
        }));
    }

    return (<App data={props.initialData} onItemChanged={handleItemChanged} onItemAdded={handleItemAdded}
                 onItemDeleted={handleItemDeleted}/>);
}

export default InMemoryApp;