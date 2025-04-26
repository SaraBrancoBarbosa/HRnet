import PropTypes from "prop-types"
import { Fragment, useMemo, useState } from "react"
import ModalComponent from "../modal/Modal"
import SearchBar from "./SearchBar"
import usePagination from "./pagination/usePagination"
import Pagination from "./pagination/Pagination"
import ShowEntriesOptions from "./ShowEntriesOptions"
import DeleteItem from "./deleteItem"
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
  headers, 
  rows,   
  deleteRow 
}) {
  
  // To format the columns
  // useMemo : to memorise the changes and not to recompute all the elements 
  const columnHeaders = useMemo(() => ([
    {
      // A column for the rows indexation
      name: "internalIndex", 
      visible: false,
      filterable: false,
      type: "number"
    },
    // Each element is transformed to string type (visible by default)
    ...headers.map(header => {
      const value = typeof header === "string"
        ? {name: header, type: "string", visible:true} 
        : {...header, visible: header.visible !== undefined ? header.visible: true}

      return value
    })
  ]),[headers])

  // Table containing the filterable columns indexes to extract them 
  const filterableColumns = useMemo(() => (
    columnHeaders.filter(header => header.filterable === true).map((_, index) => index)
  ), [columnHeaders])
  
  // Search bar text
  const [filterText, setFilterText] = useState("")

  // To filter the columns's data (search bar)
  const filteredRows = useMemo(() => (
    rows.filter((row) => {
      return filterableColumns.some((fieldIndex) => 
        row[fieldIndex].toLowerCase().includes(filterText.toLowerCase())
      )
    // To add internalIndex to each row once the filter is done
    }).map((row, internalIndex) => ([internalIndex, ...row]))
  ), [filterText, filterableColumns, rows])

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const paginationProps = usePagination({itemsPerPage: rowsPerPage, totalItems: filteredRows.length})
  const { currentItemIndex, itemsPerPage, totalItems, setCurrentPage } = paginationProps

  // To get the current rows
  const currentRows = useMemo(() => (
   filteredRows.slice(currentItemIndex, Math.min(currentItemIndex + itemsPerPage, totalItems))
  ), [filteredRows, currentItemIndex, itemsPerPage, totalItems])

  
  // To open the "confirm deletion" modal
  const [rowToDelete, setRowToDelete] = useState(null)

  return (
    <div className="table_wrapper">

      <div className="entries-and-search">
        {/* To choose the number of entries to show per page */}
        <ShowEntriesOptions
          rowsPerPage={rowsPerPage} 
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
        
        {/* Search bar */}
        <SearchBar 
          setFilterText={setFilterText}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Table */}
      <table role="grid">
        
        {/* Columns names (first row) */}
        <thead>
          <tr role="row">
            {columnHeaders.map((column, index) => (
              <Fragment key={`column-${index}`}>{column.visible && (
                <th key={index}>
                  {column.name}
                  <span className="sort-symbol">
                  </span>
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
                <Fragment key={`row-${fieldIndex}`}>{columnHeaders[fieldIndex].visible && (
                  <td>
                    <Column column={columnHeaders[fieldIndex]} value={field} />
                  </td>
                )}</Fragment>
              ))}

              {/* Button to delete the row data. The 9th row is used for the data id */}
              {deleteRow && (
                <td style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                  {/* Opens the "confirm deletion" modal */}
                  <button onClick={() => setRowToDelete(index)}
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
          <Pagination
            {...paginationProps}
          />
      </div>

      {/* Modal when deleting an employee: confirm deletion */}
      <ModalComponent
        //To open the modal only when a row is about to be deleted
        isOpen={rowToDelete !== null}
        onRequestClose={() => setRowToDelete(null)}
        title="Confirm Deletion"
        message="Are you sure you want to definitely delete this employee?"
      >
        <DeleteItem
          rowToDelete={rowToDelete}
          deleteRow={deleteRow}
          setRowToDelete={setRowToDelete}
        />
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
