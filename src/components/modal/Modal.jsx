import Modal from "react-modal"
import PropTypes from "prop-types"
import "./modal.css"

const ModalComponent = ({ isOpen, onRequestClose, title, message, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      aria={{ labelledby: "heading" }}
      className="modal"
    >
      <div className="text-container">
        <h2 id="heading">{title}</h2>
        {message && <p>{message}</p>}

        {/* Children parameters to customise the buttons */}
        <div className="modal-buttons">
          {children}
        </div>
      </div>
    </Modal>
  )
}

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  children: PropTypes.node,
}

export default ModalComponent
