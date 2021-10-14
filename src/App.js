import TaskList from './TaskList';
import Header from './Header';
import Modal from './Modal.js';
import {useState} from 'react';

function App(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteID, setDeleteID] = useState(null);

    function toggleShowCompleted(item) {
        setShowCompleted(!showCompleted)
        console.log("Toggled showing Completed vs Uncompleted")
    }

    function handleDeleteConfirmation() {
        props.onItemDeleted(deleteID);
    }

    return (
        <div className="App">
            {showDeleteModal && <Modal text={"Are you sure you want to delete this task?"}
                                        confirmButtonText={"Delete"}
                                       onModalDisplayChanged={setShowDeleteModal}
                                       onConfirmAction={handleDeleteConfirmation}/>}
            <Header onShowBtnClick={toggleShowCompleted} showCompleted={showCompleted}
                    onDelCompletedClick={props.deleteCompleted} onAddBtnClick={props.onItemAdded}/>
            {/*TODO: Pass showCompleted to TaskList and use filter to only display Completed Tasks*/}
            <TaskList onItemChanged={props.onItemChanged} onDeleteID={setDeleteID} showCompleted={showCompleted}
                      onDeleteModalDisplay={setShowDeleteModal} data={props.data}/>
        </div>
    );
}

export default App;
