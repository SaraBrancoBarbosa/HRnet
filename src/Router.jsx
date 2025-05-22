import { HashRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Homepage from "./pages/homepage/Homepage"
import Error from "./pages/error/Error"
import CreateEmployeePage from "./pages/create-employee/CreateEmployee"
import EmployeesListPage from "./pages/employees-list/EmployeesList"

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="/create-employee" index element={<CreateEmployeePage />} />
                <Route path="/employees-list" index element={<EmployeesListPage />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRouter