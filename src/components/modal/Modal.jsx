import Modal from "react-modal"
import PropTypes from "prop-types"
import "./modal.css"

const ModalComponent = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Employee successfully created modal"
      aria={{ labelledby: "heading" }}
      className="modal"
    >
        <div className="text-container">
            <h2 id="heading">Employee created!</h2>
            <button onClick={onRequestClose} className="button">Close</button>
        </div>
    </Modal>
  )
}

ModalComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
}

export default ModalComponent
