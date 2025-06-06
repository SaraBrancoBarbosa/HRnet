import PropTypes from "prop-types"
import ApiContext from "./ApiContext"
import { useEffect, useState } from "react"

/***** 
The provider of ApiContext
The provider encapsulates the children by providing the context
*****/

// To get the employees from the localStorage
const getInitialState = () => JSON.parse(localStorage.getItem("employees") ?? "[]").map(employee => ({
    ...employee,
    dateOfBirth:new Date(employee.dateOfBirth),
    startDate:new Date(employee.startDate)
}))

const ApiProviderEmployees = ({ children }) => {
    const [employees, setEmployees] = useState(getInitialState)

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees))
    }, [employees])

    const addEmployee = (employee) => {
        setEmployees((prev) => [
            ...prev,
            employee,
        ]) 
    }

    const deleteEmployee = (employeeId) => {
        setEmployees((prev) => {
            return prev.filter((employee) => employee.id !== employeeId)
        })
    }

    return <ApiContext.Provider value={{addEmployee, deleteEmployee, employees }}>
        {children}
    </ApiContext.Provider>
}

ApiProviderEmployees.propTypes = {
    children: PropTypes.node
}

export default ApiProviderEmployees