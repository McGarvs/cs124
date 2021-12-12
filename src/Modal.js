import './styles/Modal.css';

function Modal(props) {
    function closeModal() {
        props.onModalDisplayChanged(false);
    }

    function handleConfirmClick() {
        props.onConfirmAction();
    }
    
    return (
        <div className="modal-bg">
            <div className="modal-content">
                <div className="modal-text">{props.text}</div>
                <div className="modal-buttons">
                    {props.confirmButtonText !== "Close" ? <button className="modal-cancel-btn" onClick={closeModal}>Cancel</button> : ""}
                    {<button className={props.confirmButtonText === "Close" ? "modal-close-btn" : "modal-confirm-btn"}
                            onClick={() => { handleConfirmClick(); closeModal(); }}>{props.confirmButtonText}
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;