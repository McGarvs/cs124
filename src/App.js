import './styles/App.css';
import TaskList from './TaskList';
import Header from './Header';
import Modal from './Modal.js';
import {useEffect, useState} from 'react';
import deleteIcon from './static/delete-icon.png';

function SharedEmailDisplay(props) {
    const [newEmail, setNewEmail] = useState("");
    // const [localSharedEmails, setLocalSharedEmails] = useState(props.currentSharedEmails);
    const localSharedEmails = props.currentSharedEmails;

    function handleAddEmailClick(e) {
        e.preventDefault();
        props.onSharedPermsChanged("add", props.currentListId, newEmail);
        // setLocalSharedEmails(props.currentSharedEmails);
        setNewEmail("");
    }

    function handleDeleteEmailClick(email) {
        // console.log("localshared before delete:", localSharedEmails)
        props.onSharedPermsChanged("delete", props.currentListId, email);
        // setLocalSharedEmails(props.currentSharedEmails);
        // console.log("localshared after delete:", localSharedEmails)
    }

    // TODO: fix styling of email input
    return (
        <div id="shared-email-display">
            <form id="add-email-form" onSubmit={handleAddEmailClick}>
                <input type="text" id="email-input-field" placeholder="Enter an email here!" text={newEmail} maxLength="80"
                       tabIndex={props.modalDisplayed ? "-1" : ""}
                       onChange={(e) => setNewEmail(e.target.value)}
                />
                <button type="submit" id={(newEmail !== "")?"add-email-btn-active":"add-email-btn-disabled"}
                        tabIndex={props.modalDisplayed || (newEmail === "") ? "-1" : ""}
                        aria-label="Add new email to shared list">
                    +
                </button>
            </form>
            <div id="email-items">
                {
                    localSharedEmails.map((email) => (
                        <div className="email-item"
                             key={email}>
                            {email}
                            <button className="dlt-email-btn"
                                    tabIndex={props.modalDisplayed ? "-1" : ""}
                                    aria-label="Delete email"
                                    onClick={() => handleDeleteEmailClick(email)}>
                                <img src={deleteIcon} alt="delete"/>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

function App(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDelCompletedModal, setShowDelCompletedModal] = useState(false);
    const [showDelListModal, setShowDelListModal] = useState(false);
    const [showSharedWithModal, setShowSharedWithModal] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [modalDisplayed, setModalDisplayed] = useState(showDeleteModal || showDelCompletedModal || showDelListModal);

    useEffect(() => {
        setModalDisplayed(showDeleteModal || showDelCompletedModal || showDelListModal);
        console.log("modal displayed");
    },[showDeleteModal, showDelCompletedModal, showDelListModal])

    function toggleShowCompleted(item) {
        setShowCompleted(!showCompleted)
        console.log("Toggled showing Completed vs Uncompleted")
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const { height } = getWindowDimensions();

    return (
        <div className="App" style={{height: height}}>
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
            {showSharedWithModal && <Modal text={<div><SharedEmailDisplay {...props}/></div>}
                                       confirmButtonText={"Close"}
                                       onModalDisplayChanged={setShowSharedWithModal}
                                       onConfirmAction={() => setShowSharedWithModal(false)}/>}
            <Header onShowBtnClick={toggleShowCompleted} showCompleted={showCompleted}
                    onDelCompletedModalDisplay={setShowDelCompletedModal}
                    onAddBtnClick={props.onItemAdded} data={props.data}
                    modalDisplayed={modalDisplayed}/>
            {/*TODO: Pass showCompleted to TaskList and use filter to only display Completed Tasks*/}
            <TaskList onItemChanged={props.onItemChanged} onDeleteID={setDeleteID} showCompleted={showCompleted}
                      onDeleteModalDisplay={setShowDeleteModal} data={props.data}
                      sortType={props.sortType} onSortTypeChanged={props.onSortTypeChanged}
                      modalDisplayed={modalDisplayed}
                      allLists={props.allLists}
                      createNewList={props.createNewList}
                      currentListId={props.currentListId}
                      currentListName={props.currentListName}
                      onCurrentListChanged={props.onCurrentListChanged}
                      onDelListModalDisplay={setShowDelListModal}
                      onSharedPermsChanged={props.onSharedPermsChanged}
                      onSharedWithModalDisplay={setShowSharedWithModal}
            />
        </div>
    );
}

export default App;
