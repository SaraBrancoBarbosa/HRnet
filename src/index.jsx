import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import ApiProviderEmployees from "./api/employee-context/ApiProvider"
import App from "./App"
import Modal from "react-modal"
import "./index.css"

const root = document.getElementById("root")

Modal.setAppElement(root)

createRoot(root).render(
  <StrictMode>
    <ApiProviderEmployees>
      <App />
    </ApiProviderEmployees>
  </StrictMode>
)
