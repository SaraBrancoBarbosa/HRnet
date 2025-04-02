import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import "./layout.css"

const Layout = () => {
    return (
      <>
        <div className="width-margin wrapper">
          <Header />

          <main>
            <Outlet />
          </main>

        </div>
        <Footer />
      </>
    )
  }
  
  export default Layout