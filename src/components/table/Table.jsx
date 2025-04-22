import PropTypes from "prop-types"
import { Fragment, useState } from "react"
import ModalComponent from "../modal/Modal"
import "./table.css"

// Date conversion 
Date.prototype.tableDate = function() {
  const month = (""+(this.getMonth()+1)).padStart(2,"0")
  const day = (""+this.getDate()).padStart(2,"0")
  const year = this.getFullYear()

  return [year,month,day].join("/")
}

// Column component
const Column = ({column, value}) => {
  if(column.type === "date") return value instanceof Date ? value.tableDate() : value.toString()
  if(column.type === "number") return "" +value
  if(!(typeof value === "string")) return JSON.stringify(value)

  return value
}

function TableComponent({ 
  columns, 
  rows,   
  deleteRow 
}) {
  
  const [filterText, setFilterText] = useState("")

  // To open the "confirm deletion" modal
  const [rowToDelete, setRowToDelete] = useState(null)

  // Pagination management
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)

  // To format the columns
  columns = columns.map(column => {
    const value = typeof column === "string"
      ? {name: column, type: "string", visible:true} 
      : {...column, visible: column.visible !== undefined ? column.visible: true}

    return value
  })

  const filterableColumns = columns.filter(column => column.filterable === true).map((column, index) => index)

  // Filter management (search bar)
  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }
  // To filter the columns's data (search bar)
  const filteredRows = rows.filter((row) => {
    return filterableColumns.some((fieldIndex) => 
      row[fieldIndex].toLowerCase().includes(filterText.toLowerCase())
    )
  })

  // To get the current rows
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow)

  const pageNumbers = []
  const totalRows = filteredRows.length
  for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i)
  }

  // Change page
  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  // To leave the delete modal without deleting the data
  const handleCancelDelete = () => {
    setRowToDelete(null)
  }

  // To delete the row data
  const handleDeleteConfirm = () => {
    if (rowToDelete !== null) {
      deleteRow(rowToDelete)
      setRowToDelete(null)
    }
  }

  return (
    <div className="table_wrapper">

      {/* To choose the number of entries to show per page */}
      <div className="entries-and-search">
        <div id="table_length">
          <label>
            Show {" "}
            <select
              name="table_length"
              value
              onChange={() => ""}

            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>

        {/* Search bar */}
        <div id="table_filter">
          <label>
            Search: {" "}
            <input 
              type="search" 
              placeholder="" 
              value={filterText} 
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>

      {/* Table */}
      <table id="table" role="grid">
        
        {/* Columns names (first row) */}
        <thead>
          <tr role="row">
            {columns.map((column, index) => (
              <Fragment key={`column-${index}`}>{column.visible && (
                <th>
                  {column.name}
                </th>
              )}</Fragment>
            ))}
            {deleteRow && (
              <th key="button-delete">
                Delete
              </th>
            )}
          </tr>
        </thead>

        {/* To display the data (one row for each group of elements) */}
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index} role="row" className="row">
              {row.map((field, fieldIndex) => (
                <Fragment key={`row-${fieldIndex}`}>{columns[fieldIndex].visible && (
                  <td>
                    <Column column={columns[fieldIndex]} value={field} />
                  </td>
                )}</Fragment>
              ))}

              {/* Button to delete the row data. The 9th row is used for the data id */}
              {deleteRow && (
                <td style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                  {/* Opens the "confirm deletion" modal */}
                  <button onClick={() => setRowToDelete(row[9])} 
                    type="button" 
                    className="button button-delete" 
                  >
                    X
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="info-and-pagination">

        {/* To know the number of entries showing / total */}
        <div id="table_info">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, totalRows)} of {totalRows} entries
        </div>

        {/* Previous and next page + the current page */}
        <nav className="table-pagination">
          <a
            onClick={() => {
              // To forbid the click when on the first page
              if (currentPage > 1) handleChangePage(currentPage - 1)
            }}
            className={currentPage === 1 ? "disabled" : "change-page"}
          >
            Previous
          </a>

          <span id="current_page" className="current-page">
            {currentPage}
          </span>

          <a 
            // To forbid the click when on the last page
            onClick={() => {
              if (currentPage < pageNumbers.length) handleChangePage(currentPage + 1)
            }}
            className={currentPage === pageNumbers.length ? "disabled" : "change-page"}
          >
            Next
          </a>
        </nav>
      </div>

      {/* Modal when deleting an employee: confirm deletion */}
      <ModalComponent
        //To open the modal only when a row is going to be deleted
        isOpen={rowToDelete !== null}
        onRequestClose={handleCancelDelete}
        title="Confirm Deletion"
        message="Are you sure you want to definitely delete this employee?"
      >
        <button onClick={handleDeleteConfirm} className="button" style={{backgroundColor:"red"}}>Delete</button>
        <button onClick={handleCancelDelete} className="button">Cancel</button>
      </ModalComponent>

    </div>
    
  )
}

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  deleteRow: PropTypes.func.isRequired,
}

export default TableComponent
