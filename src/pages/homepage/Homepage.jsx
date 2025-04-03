import { Link } from "react-router"
import "./homepage.css"

function Homepage() {
  return (
    <div className="homepage-container">
      
      <h1>HRnet</h1>
      <h2>Manage efficiently your employees data!</h2>

      <div className="pages-list">
        <Link to="/create-employee">Create Employee</Link>
        <Link to="/employees-list">Employees List</Link>
      </div>

    </div>
  )
}

export default Homepage
