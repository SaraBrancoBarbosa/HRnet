import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { mockEmployeeContext, mockFetch } from "../__mocks__/mock"
import Context from "../../api/employee-context/ApiContext"
import EmployeesListPage from "../../pages/employees-list/EmployeesList"
import Pagination from "../../components/react-table-component/src/pagination/Pagination"
import SearchBar from "../../components/react-table-component/src/SearchBar"
import ShowEntriesOptions from "../../components/react-table-component/src/ShowEntriesOptions"
import DeleteItem from "../../components/deleteButton/DeleteItem"

describe("When EmployeesListPage is called", () => {
    // To use the mocked data before each test
    beforeEach(() => {
        mockFetch({ employeesList: [] })
        render(
            <MemoryRouter>
                <Context.Provider value={mockEmployeeContext}>
                    <EmployeesListPage />
                </Context.Provider>
            </MemoryRouter>
        )
    })

    // To reset the mocked data after each test
    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("Then, it should render EmployeesListPage", async () => {
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

        expect(screen.getByText(/Current Employees/i)).toBeInTheDocument()
    })

    test("Then, the table should be displayed", () => {
        const table = screen.getByRole("grid")
        expect(table).toBeInTheDocument()
    })

    test("Then, each header should be displayed", () => {
        const headers = [
            "First Name",
            "Last Name",
            "Date of Birth",
            "Department",
            "Start Date",
            "Street",
            "City",
            "State",
            "Zip Code"
        ]

        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument()
        })
    })

    test("Then, the table should be displayed with the employees data", async () => {
        mockEmployeeContext.employees.forEach((employee) => {
            expect(screen.getByText(employee.firstName)).toBeInTheDocument()
            expect(screen.getByText(employee.lastName)).toBeInTheDocument()
            expect(screen.getByText(employee.dateOfBirth)).toBeInTheDocument()
            expect(screen.getByText(employee.department)).toBeInTheDocument()
            expect(screen.getByText(employee.startDate)).toBeInTheDocument()
            expect(screen.getByText(employee.street)).toBeInTheDocument()
            expect(screen.getByText(employee.city)).toBeInTheDocument()
            expect(screen.getByText(employee.state)).toBeInTheDocument()
            expect(screen.getByText(employee.zipCode)).toBeInTheDocument()
        })
    })

    test("Then, all my features are displayed", async () => {
        const showEntriesOption = screen.getByText(/Show entries/i)
        expect(showEntriesOption).toBeInTheDocument()

        const searchBar = screen.getByLabelText(/Search/i)
        expect(searchBar).toBeInTheDocument()

        const pagination = screen.getByText(/Previous/i)
        expect(pagination).toBeInTheDocument()

        const modalButton = screen.getAllByRole("button", { name: /X/i })[0]
        userEvent.click(modalButton)
        await waitFor(() => expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument())

        const deleteItemButton = screen.getAllByRole("button", { name: /X/i })[0]
        userEvent.click(deleteItemButton)
        await waitFor(() => expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument())
        const deleteButton = screen.getByRole("button", { name: /Delete/i })
        expect(deleteButton).toBeInTheDocument()

        const sortItem = document.querySelector(".sort-symbol")
        expect (sortItem).toBeInTheDocument()
    })
})

describe("When I am on the EmployeesListPage", () => {
    // To use the mocked data before each test
    beforeEach(() => {
        mockFetch({ employeesList: [] })
        render(
            <MemoryRouter>
                <Context.Provider value={mockEmployeeContext}>
                    <EmployeesListPage />
                </Context.Provider>
            </MemoryRouter>
        )
    })

    // To reset the mocked data after each test
    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("Then, I should be able to cancel the deletion of the employee", async () => {
        const deleteButtons = screen.getAllByRole("button", { name: /X/i })

        // To use the first button as an example
        const firstDeleteButton = deleteButtons[0]

        userEvent.click(firstDeleteButton)

        await waitFor(() => expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument())

        const cancelButton = screen.getByRole("button", { name: /Cancel/i })
        userEvent.click(cancelButton)

        expect(screen.queryByText(mockEmployeeContext.employees[0].firstName)).toBeInTheDocument()
    })

    test("Then, I should be able to delete an employee data by clicking on the according button", async () => {
        // To mock the two functions
        const deleteRowMock = jest.fn()
        const setRowToDeleteMock = jest.fn()

        render(
            <DeleteItem
                // Example of row to delete by using the index 1 (second row)
                rowToDelete={1}
                deleteRow={deleteRowMock}
                setRowToDelete={setRowToDeleteMock}
                onClose={null}
            />
        )

        const deleteButton = screen.getByRole("button", { name: /delete/i })
        fireEvent.click(deleteButton)

        expect(deleteRowMock).toHaveBeenCalledWith(1)
        expect(setRowToDeleteMock).toHaveBeenCalledWith(null)
    })

    describe("When I am on the EmployeesListPage and I'm using the pagination system", () => {
        let mockSetCurrentPage
        beforeEach(() => {
            mockSetCurrentPage = jest.fn()
        })
        
        test("Then, I navigate to the previous page when clicking on 'Previous'", async () => {
            render(
                <Pagination
                    totalItems={30}
                    itemsPerPage={10}
                    currentPage={1}
                    currentItemIndex={10}
                    setCurrentPage={mockSetCurrentPage}
                />
            )

            // To confirm we are on the second page
            const currentPageElements = screen.queryAllByText("2")
            const currentPageElement = currentPageElements.find(el => el.classList.contains("current-page"))
            expect(currentPageElement).toBeInTheDocument()

            const previousPageButton = document.querySelector(".previous-page:not([disabled])")

            expect(previousPageButton).toBeEnabled()

            userEvent.click(previousPageButton )

            await waitFor(() => {
                expect(mockSetCurrentPage).toHaveBeenCalledWith(0)
            })

            // To confirm we are now on the first page
            const confirmCurrentPageElements = screen.queryAllByText("1")
            const confirmCurrentPageElement = confirmCurrentPageElements.find(el => el.classList.contains("current-page"))
            expect(confirmCurrentPageElement).toBeInTheDocument()
        })

        test("Then, I'm not allowed to navigate to the previous page when clicking on 'Previous' on the first page", async () => {
            render(
                <Pagination
                    totalItems={30}
                    itemsPerPage={10}
                    currentPage={0}
                    currentItemIndex={10}
                    setCurrentPage={mockSetCurrentPage}
                />
            )
        
            // To confirm we are on the first page
            const currentPageElements = screen.queryAllByText("1")
            const currentPageElement = currentPageElements.find(el => el.classList.contains("current-page"))
            expect(currentPageElement).toBeInTheDocument()
    
            const previousPage = document.querySelector(".disabled")
    
            userEvent.click(previousPage)
    
            await waitFor(() => {
                expect(mockSetCurrentPage).not.toHaveBeenCalledWith(0)
            })
    
            // To confirme we are still on the first page after clicking
            const confirmCurrentPageElements = screen.queryAllByText("1")
            const confirmCurrentPageElement = confirmCurrentPageElements.find(el => el.classList.contains("current-page"))
            expect(confirmCurrentPageElement).toBeInTheDocument()
        })

        test("Then, I navigate to the next page when clicking on 'Next'", async () => {
            render(
                <Pagination
                    totalItems={30}
                    itemsPerPage={10}
                    currentPage={0}
                    currentItemIndex={10}
                    setCurrentPage={mockSetCurrentPage}
                />
            )

            // To confirm we are on the first page
            const currentPageElements = screen.queryAllByText("1")
            const currentPageElement = currentPageElements.find(el => el.classList.contains("current-page"))
            expect(currentPageElement).toBeInTheDocument()

            const nextPageButton = document.querySelector(".next-page:not([disabled])")

            expect(nextPageButton).toBeEnabled()

            userEvent.click(nextPageButton)

            await waitFor(() => {
                expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
            })

            // To confirm we are now on the first page
            const confirmCurrentPageElements = screen.queryAllByText("1")
            const confirmCurrentPageElement = confirmCurrentPageElements.find(el => el.classList.contains("current-page"))
            expect(confirmCurrentPageElement).toBeInTheDocument()
        })

        test("Then, I'm not allowed to navigate to the next page when clicking on 'Next' on the last page", async () => {
            render(
                <Pagination
                    totalItems={30}
                    itemsPerPage={10}
                    currentPage={2}
                    currentItemIndex={10}
                    setCurrentPage={mockSetCurrentPage}
                />
            )
        
            // To confirm we are on the last page
            const currentPageElements = screen.queryAllByText("3")
            const currentPageElement = currentPageElements.find(el => el.classList.contains("current-page"))
            expect(currentPageElement).toBeInTheDocument()
    
            const nextPage = document.querySelector(".disabled")
    
            userEvent.click(nextPage)
    
            await waitFor(() => {
                expect(mockSetCurrentPage).not.toHaveBeenCalledWith(0)
            })
    
            // To confirme we are still on the last page after clicking
            const confirmCurrentPageElements = screen.queryAllByText("3")
            const confirmCurrentPageElement = confirmCurrentPageElements.find(el => el.classList.contains("current-page"))
            expect(confirmCurrentPageElement).toBeInTheDocument()
        })
    })

    
})
describe("When I am on the EmployeesListPage and I'm using the SearchBar component", () => {
    test("Then, the table is updated when I write in the Search Bar", async () => {
        const setFilterText = jest.fn()
        const setCurrentPage = jest.fn()
      
        const { getByLabelText } = render(
            <SearchBar 
                setFilterText={setFilterText} 
                setCurrentPage={setCurrentPage}
            />
        )

        const searchInput = getByLabelText(/Search/i)

        fireEvent.change(searchInput, { target: { value: "test" } })

        expect(searchInput.value).toBe("test")
        expect(setFilterText).toHaveBeenCalledWith("test")
        expect(setCurrentPage).toHaveBeenCalledWith(0)

    })
})

describe("When I am on the EmployeesListPage and I'm using the ShowEntriesOptions component", () => {
    test("Then, the rows per page is updated when selecting a different option", () => {
        const setRowsPerPage = jest.fn()
        const setCurrentPage = jest.fn()

        const { getByLabelText } = render(
            <ShowEntriesOptions 
                setRowsPerPage={setRowsPerPage} 
                rowsPerPage={10}
                setCurrentPage={setCurrentPage} 
            />
        )

        const select = getByLabelText(/Show/i)
        
        fireEvent.change(select, { target: { value: "25" } })
        
        expect(setRowsPerPage).toHaveBeenCalledWith(25)
        expect(setCurrentPage).toHaveBeenCalledWith(0)
    })
})

describe("When I am on the EmployeesListPage and I'm using the SortItem component", () => {
    beforeEach(() => {
        mockFetch({ employeesList: [] })
        render(
            <MemoryRouter>
                <Context.Provider value={mockEmployeeContext}>
                    <EmployeesListPage />
                </Context.Provider>
            </MemoryRouter>
        )
    })
    test("Then, when I click on the sorting icons in the headers, the table is correctly sorted", async () => {
        const firstNameHeader = screen.getByText(/First Name/i)
        const sortIcon = firstNameHeader.querySelector(".sort-symbol")

        // At first: random order
        const rowsBeforeSort = screen.getAllByRole("row")
        expect(rowsBeforeSort[1].textContent).toMatch(/Janeen/)
        expect(rowsBeforeSort[2].textContent).toMatch(/Fabiano/)

        fireEvent.click(sortIcon)

        // First click: ascendant
        const rowsAfterSortAsc = screen.getAllByRole("row")
        expect(rowsAfterSortAsc[1].textContent).toMatch(/Fabiano/)
        expect(rowsAfterSortAsc[2].textContent).toMatch(/Janeen/)

        expect(sortIcon.textContent).toBe("↑")

        fireEvent.click(sortIcon)

        // Second click: descendant
        const rowsAfterSortDesc = screen.getAllByRole("row")
        expect(rowsAfterSortDesc[1].textContent).toMatch(/Janeen/)
        expect(rowsAfterSortDesc[2].textContent).toMatch(/Fabiano/)

        expect(sortIcon.textContent).toBe("↓")
    })
})