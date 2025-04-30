import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { mockEmployeeContext } from "../__mocks__/mock"
import { userEvent} from "@testing-library/user-event"
import useFetchStates from "../../api/useFetchStates"
import useFetchDepartments from "../../api/useFetchDepartments"
import EmployeeContext from "../../api/employee-context/ApiContext"
import CreateEmployeePage from "../../pages/create-employee/CreateEmployee"

// To mock the hooks
jest.mock("../../api/useFetchStates")
jest.mock("../../api/useFetchDepartments")

// To use the mocked data before each test + to use the States and Departments fetches
beforeEach(() => {
  useFetchStates.mockReturnValue({
    states: [{ name: "Tennessee" }],
    loading: false,
    loaded: true,
    error: null
  })

  useFetchDepartments.mockReturnValue({
    departments: [{ name: "Engineering" }],
    loading: false,
    loaded: true,
    error: null
  })

  render(
    <EmployeeContext.Provider value={mockEmployeeContext}>
      <CreateEmployeePage />
    </EmployeeContext.Provider>
  )
})

// To reset the mocked data after each test
afterEach(() => {
  jest.restoreAllMocks()
})

describe("When CreateEmployeePage is called", () => {
  test("Then, it should render CreateEmployeePage", () => {
    expect(screen.getByText(/Create Employee/i)).toBeInTheDocument()
  })

  test("Then, the form is displayed with all the fields", () => {
    screen.debug()

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument()
  })

  test("Then, the error messages are displayed when submitting the form without completing the fields", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Save/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/is required/i).length).toBeTruthy()
    })
  })

  test("Then, the error message is not displayed anymore when the field is correctly filled", async () => {
    const field = screen.getByLabelText(/First Name/i)
    userEvent.click(screen.getByRole("button", { name: /Save/i }))

    await waitFor(() => {
      expect(screen.getByText(/The first name is required./i)).toBeInTheDocument()
    })

    userEvent.type(field,"Janeen")

    userEvent.click(screen.getByRole("button", { name: /Save/i }))

    await waitFor(() => {
      expect(screen.queryByText(/The first name is required/i)).not.toBeInTheDocument()
    })
  })
 
  test("Then, displays the confirm modal when the form is completed and submitted", async () => {
    // To complete!
  })
  
})