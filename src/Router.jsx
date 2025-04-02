import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Homepage from "./pages/homepage/Homepage"
import Error from "./pages/error/Error"
import EmployeeListPage from "./pages/employee-list/EmployeeList"

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="/employee-list" index element={<EmployeeListPage />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRouter