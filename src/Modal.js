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
                  <div className="modal-cancel-btn" onClick={closeModal}>Cancel</div>
                  <div className="modal-confirm-btn" onClick={() => { handleConfirmClick(); closeModal(); }}>{props.confirmButtonText}</div>
              </div>
          </div>
      </div>
    );
}

export default Modal;