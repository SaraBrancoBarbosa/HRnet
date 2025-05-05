import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { mockEmployeeContext, mockFetch } from "../__mocks__/mock"
import Context from "../../api/employee-context/ApiContext"
import Homepage from "../../pages/homepage/Homepage"
import CreateEmployeePage from "../../pages/create-employee/CreateEmployee"
import EmployeesListPage from "../../pages/employees-list/EmployeesList"

// To use the mocked data before each test
beforeEach(() => {
  mockFetch({ employeesList: mockEmployeeContext.employees })
})

// To reset the mocked data after each test
afterEach(() => {
  jest.restoreAllMocks()
})

describe("When the Homepage is called", () => {
  test("Then, it should render the Homepage", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Manage efficiently your employees data!/i)).toBeInTheDocument() 
  })
})

describe("When on the Homepage", () => {
  describe("When clicking on the Create Employee link", () => {
    test("Then, it should navigate to the Create Employee page", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Context.Provider value={{ addEmployee: jest.fn() }}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/create-employee" element={<CreateEmployeePage />} />
            </Routes>
          </Context.Provider>
        </MemoryRouter>
      )

      fireEvent.click(screen.getByRole("link", { name: "Create Employee" }))
              
      expect(screen.getByText("Create Employee")).toBeTruthy()
    })
  })

  describe("When clicking on the Employees List link", () => {
    test("Then, it should navigate to the Employees List page", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Context.Provider value={mockEmployeeContext}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/employees-list" element={<EmployeesListPage />} />
            </Routes>
          </Context.Provider>
        </MemoryRouter>
      )
      
      fireEvent.click(screen.getByRole("link", { name: "Employees List" }))

      expect(screen.getByText(/Current Employees/i)).toBeTruthy()
    })
  })
})