import PropTypes from "prop-types"

function DeleteItem({ rowToDelete, deleteRow, setRowToDelete  }) {

    // To cancel the row data deletion
    const handleCancelDelete = () => {
        setRowToDelete(null)
    }

    // To confirm the row data deletion
    const handleConfirmDelete = () => {
        if (rowToDelete !== null) {
            deleteRow(rowToDelete)
            handleCancelDelete()
        }
    }

    return (
        <div style={{display: "flex", gap: "1rem"}}>
            <button onClick={handleConfirmDelete} className="button" style={{backgroundColor:"red"}}>Delete</button>
            <button onClick={handleCancelDelete} className="button">Cancel</button>
        </div>
    )
}

DeleteItem.propTypes = {
    rowToDelete: PropTypes.number,
    deleteRow: PropTypes.func.isRequired,
    setRowToDelete: PropTypes.func.isRequired,
}

export default DeleteItem
