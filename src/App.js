import './styles/App.css';
import TaskList from './TaskList';
import Header from './Header';
import Lists from './Lists';
import Modal from './Modal.js';
import {useEffect, useState} from 'react';

function App(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDelCompletedModal, setShowDelCompletedModal] = useState(false);
    const [showDelListModal, setShowDelListModal] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [modalDisplayed, setModalDisplayed] = useState(showDeleteModal || showDelCompletedModal);

    useEffect(() => {
        setModalDisplayed(showDeleteModal || showDelCompletedModal);
    },[showDeleteModal, showDelCompletedModal])

    function toggleShowCompleted(item) {
        setShowCompleted(!showCompleted)
        console.log("Toggled showing Completed vs Uncompleted")
    }

    return (
        <div className="App">
            {showDeleteModal && <Modal text={"Are you sure you want to delete this task?"}
                                       confirmButtonText={"Delete"}
                                       onModalDisplayChanged={setShowDeleteModal}
                                       onConfirmAction={() => props.onItemDeleted(deleteID)}/>}
            {showDelCompletedModal && <Modal text={"Are you sure you want to delete all completed tasks?"}
                                             confirmButtonText={"Delete All"}
                                             onModalDisplayChanged={setShowDelCompletedModal}
                                             onConfirmAction={props.onDeleteCompleted}/>}
            {showDelListModal && <Modal text={"Are you sure you want to delete the current list?"}
                                             confirmButtonText={"Delete List"}
                                             onModalDisplayChanged={setShowDelListModal}
                                             onConfirmAction={props.onCurrentListDelete}/>}
            <Header onShowBtnClick={toggleShowCompleted} showCompleted={showCompleted}
                    onDelCompletedModalDisplay={setShowDelCompletedModal}
                    onAddBtnClick={props.onItemAdded} data={props.data}
                    modalDisplayed={modalDisplayed}/>
            <Lists allLists={props.allLists}
                   createNewList={props.createNewList}
                   currentListId={props.currentListId}
                   onCurrentListChanged={props.onCurrentListChanged}
                   onDelListModalDisplay={setShowDelListModal}
                   modalDisplayed={modalDisplayed}/>
            {/*TODO: Pass showCompleted to TaskList and use filter to only display Completed Tasks*/}
            <TaskList onItemChanged={props.onItemChanged} onDeleteID={setDeleteID} showCompleted={showCompleted}
                      onDeleteModalDisplay={setShowDeleteModal} data={props.data}
                      sortType={props.sortType} onSortTypeChanged={props.onSortTypeChanged}
                      modalDisplayed={modalDisplayed}/>
        </div>
    );
}

export default App;
