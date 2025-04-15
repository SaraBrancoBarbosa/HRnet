import { useContext } from "react"
import Context from "../../api/employee-context/ApiContext"
import TableComponent from "../../components/table/Table"
import "./employeesList.css"

function EmployeesListPage() {

  // To get the employees from the Context
  const { employees } = useContext(Context)
  // Tp get the deleteEmployee function from the Context
  const { deleteEmployee } = useContext(Context)

  const columns = [
    "First Name",
    "Last Name",
    "Date of Birth",
    "Department",
    "Start Date",
    "Street",
    "City",
    "State",
    "Zip Code",
    "Delete"
  ]

  // The employees data
  const data = employees.map((employee) => [
    employee.firstName,
    employee.lastName,
    employee.dateOfBirth,
    employee.department,
    employee.startDate,
    employee.street,
    employee.city,
    employee.state,
    employee.zipCode,
    employee.id,
  ])

  // The columns we are using for the "search" filter: firstName and lastName (maybe add other categories?)
  const filterableColumns = [0, 1]

  return (
    <div className="employee-list-container">
      <h1>Current Employees</h1>

      <TableComponent 
        columns={columns} 
        data={data} 
        pagination={""} 
        entriesPerPage={""} 
        onPageChange={""}
        deleteData={deleteEmployee}
        filterableColumns={filterableColumns}
      />

    </div>
  )
}

export default EmployeesListPage
