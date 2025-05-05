// To mock the employees list fetch
export const mockFetch = (response = { employeesList: [] }) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
      ok: true,
      status: 200
    })
  )
}
  
// To mock the employee Context with some data, the add function and the delete function
export const mockEmployeeContext = {
  employees: [
    {
      firstName: "Janeen",
      lastName: "Yorkston",
      dateOfBirth: "1991-12-01",
      department: "Engineering",
      startDate: "2024-11-30",
      street: "1 Paget Street",
      city: "Nashville",
      state: "Tennessee",
      zipCode: "37210",
      id: "1"
    },
    {
      firstName: "Fabiano",
      lastName: "Riggoll",
      dateOfBirth: "1993-02-22",
      department: "Sales",
      startDate: "2025-04-08",
      street: "6752 Bayside Parkway",
      city: "Boise",
      state: "Idaho",
      zipCode: "83716",
      id: "1"
    }
  ],
  deleteEmployee: jest.fn(),
  addEmployee: jest.fn()
}

