import { Link } from "react-router-dom"
import "./header.css"

function Header() {
    
    return (
        <header className="header">
            <Link to="/">
                <img className="logo" src="assets/logo.png" alt="Logo du site Kasa. Le lien mène à la page d'accueil." />
            </Link>

            <nav>
                <Link to="/">Create Employee</Link>
                <Link to="/employee-list">Current Employees</Link>
            </nav>
        </header>
    )
}

export default Header