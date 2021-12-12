import './styles/App.css';
import TaskList from './TaskList';
import Header from './Header';
import Modal from './Modal.js';
import {useEffect, useState} from 'react';
import deleteIcon from './static/delete-icon.png';

function SharedEmailDisplay(props) {
    const [newEmail, setNewEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const localSharedEmails = props.currentSharedEmails;

    function onFormSubmit(e) {
        e.preventDefault();
        // only task list owner can share to additional users
        if (newEmail !== "") {
            props.onSharedPermsChanged("add", props.currentListId, newEmail);
            setNewEmail("");
        }
    }

    function handleDeleteEmailClick(email) {
        props.onSharedPermsChanged("delete", props.currentListId, email);
        if (props.user.email === email){
            props.onCurrentListChanged("");
        }
    }

    function validateEmail(email) {
        // Checks email format with Regex
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = (String(email).toLowerCase().match(re));
        const bool = (email !== props.user.email)
            && !localSharedEmails.includes(email)
            && !(!Array.isArray(result) || !result.length);
        setIsValidEmail(bool);
    }

    function handleEnterPress(e, email){
        if (e.which === 13) {
            setNewEmail(e.target.value);
            validateEmail(e.target.value);
            if(isValidEmail) {
                onFormSubmit(e);
            }
        }
    }

    return (
        <div id="shared-email-display">
            {localSharedEmails.includes(props.user.email) &&
            <div id="email-shared-msg">Click the trash icon to remove yourself from the list!</div>}
            {props.currentListOwnerEmail === props.user.email &&
                    (!isValidEmail && <div id="email-validation-error">Please Enter a Valid Email!</div>)}
            {props.currentListOwnerEmail === props.user.email &&
            <form id="add-email-form" onSubmit={e => {e.preventDefault()}} onKeyUp={(e) => handleEnterPress(e)}>
                <input type="text" id="email-input-field" placeholder="Enter an email here!" text={newEmail}
                       maxLength="80"
                       tabIndex={props.modalDisplayed ? "-1" : ""}
                       onChange={(e) => {
                           setNewEmail(e.target.value);
                           validateEmail(e.target.value);
                       }}
                />
                <button type="submit"
                        onClick={onFormSubmit}
                        id={(newEmail !== "" && isValidEmail) ? "add-email-btn-active":
                            "add-email-btn-disabled"}
                        className={(newEmail !== "" && isValidEmail) ? "text-btn btn-enabled":
                            "text-btn btn-disabled"}
                        tabIndex={props.modalDisplayed || (newEmail === "") ? "-1" : ""}
                        aria-label="Add new email to shared list">
                    +
                </button>
            </form>}
            <div id="email-items">
                {localSharedEmails.map((email) => (
                    <div className="email-item"
                         key={email}>
                        {email}
                        {(props.currentListOwnerEmail === props.user.email || email === props.user.email) &&
                        <button className="dlt-email-btn"
                                tabIndex={props.modalDisplayed ? "-1" : ""}
                                aria-label="Delete email"
                                onClick={() => handleDeleteEmailClick(email)}>
                            <img src={deleteIcon} alt="delete"/>
                        </button>
                        }
                    </div>
                ))}
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
        // console.log("modal displayed");
    }, [showDeleteModal, showDelCompletedModal, showDelListModal])

    function toggleShowCompleted(item) {
        setShowCompleted(!showCompleted)
    }

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    const {height} = getWindowDimensions();

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
            <TaskList user={props.user} onItemChanged={props.onItemChanged}
                      onDeleteID={setDeleteID} showCompleted={showCompleted}
                      onDeleteModalDisplay={setShowDeleteModal} data={props.data}
                      sortType={props.sortType} onSortTypeChanged={props.onSortTypeChanged}
                      modalDisplayed={modalDisplayed}
                      allLists={props.allLists}
                      createNewList={props.createNewList}
                      currentListId={props.currentListId}
                      currentListName={props.currentListName}
                      currentListOwnerEmail={props.currentListOwnerEmail}
                      onCurrentListChanged={props.onCurrentListChanged}
                      onDelListModalDisplay={setShowDelListModal}
                      onSharedPermsChanged={props.onSharedPermsChanged}
                      onSharedWithModalDisplay={setShowSharedWithModal}
            />
        </div>
    );
}

export default App;
