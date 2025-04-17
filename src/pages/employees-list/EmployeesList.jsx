import { useContext } from "react"
import Context from "../../api/employee-context/ApiContext"
import TableComponent from "../../components/table/Table"
import "./employeesList.css"

const columns = [
  {name:"First Name", filterable: true},
  {name:"Last Name", filterable: true},
  {name:"Date of Birth", type:"date"},
  "Department",
  {name:"Start Date", type:"date"},
  "Street",
  "City",
  "State",
  {name:"Zip Code", type:"number"},
  {name:"Id", type:"string", visible:false}
]

function EmployeesListPage() {

  // To get the employees from the Context
  const { employees } = useContext(Context)
  // Tp get the deleteEmployee function from the Context
  const { deleteEmployee } = useContext(Context)

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

  return (
    <div className="employee-list-container">
      <h1>Current Employees</h1>

      <TableComponent 
        columns={columns} 
        rows={data} 
        pagination={""} 
        entriesPerPage={""} 
        onPageChange={""}
        deleteRow={deleteEmployee}
      />

    </div>
  )
}

export default EmployeesListPage
