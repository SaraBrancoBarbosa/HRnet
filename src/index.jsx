import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Modal from "react-modal"
import "./index.css"
import App from "./App.jsx"
import ApiProviderEmployees from "./api/context/ApiProvider.jsx"

Modal.setAppElement("#root")

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProviderEmployees>
      <App />
    </ApiProviderEmployees>
  </StrictMode>
)
