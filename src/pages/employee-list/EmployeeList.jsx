import "./employeeList.css"

export default function EmployeeListPage() {
  return (
    <div className="employee-list-container">
      <h1>Current Employees</h1>

      <div id="employee-table_wrapper" className="employee-table_wrapper">
        
        <div className="entries-and-search">
          <div id="employee-table_length">
            <label>Show 
              <select name="employee-table_length" aria-controls="employee-table">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select> entries
            </label>
          </div>
          <div id="employee-table_filter">
            <label>Search:
              <input type="search" placeholder="" aria-controls="employee-table" />
            </label>
          </div>
        </div>

        <table id="employee-table" role="grid" aria-describedby="employee-table_info">
          <thead>
            <tr role="row">
              <th tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="First Name: activate to sort column descending">First Name</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="Last Name: activate to sort column ascending">Last Name</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="Start Date: activate to sort column ascending">Start Date</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="Department: activate to sort column ascending">Department</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="Date of Birth: activate to sort column ascending">Date of Birth</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="Street: activate to sort column ascending">Street</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="City: activate to sort column ascending">City</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="State: activate to sort column ascending">State</th>
              <th  tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" aria-label="Zip Code: activate to sort column ascending">Zip Code</th>
            </tr>
          </thead>
          <tbody>
            <tr role="row">
              <td></td>
              <td></td>
              <td></td>
              <td>Sales</td>
              <td></td>
              <td></td>
              <td></td>
              <td>AL</td>
              <td></td>
            </tr>
            <tr role="row">
              <td></td>
              <td></td>
              <td></td>
              <td>Sales</td>
              <td></td>
              <td></td>
              <td></td>
              <td>AL</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="info-and-pagination">
          <div id="employee-table_info" role="status" aria-live="polite">
            Showing 1 to 2 of 2 entries
          </div>
          <div id="employee-table_paginate">
            <a aria-controls="employee-table" data-dt-idx="0" tabIndex="-1" id="employee-table_previous">Previous</a>
            <span>
              <a aria-controls="employee-table" data-dt-idx="1" tabIndex="0">1</a>
            </span>
            <a aria-controls="employee-table" data-dt-idx="2" tabIndex="-1" id="employee-table_next">Next</a>
          </div>
        </div>

      </div>
    </div>
  )
}
