import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import ErrorPage from "../../pages/error/Error"
import Homepage from "../../pages/homepage/Homepage"

describe("When ErrorPage is called", () => {
    test("Then, it should render ErrorPage", () => {
        render(
            <MemoryRouter>
              <ErrorPage />
            </MemoryRouter>
          )
        expect(screen.getByText(/Oops!/i)).toBeTruthy()
    })
})

describe("When on ErrorPage", () => {
  describe("When clicking on the link to go to the Homepage", () => {
    test("Then, it should navigate to the Homepage", () => {
      render(
        <MemoryRouter initialEntries={["/error"]}>
          <Routes>
            <Route path="/error" element={<ErrorPage />} />
            <Route index element={<Homepage />} />
          </Routes>
        </MemoryRouter>
        )
      
      fireEvent.click(screen.getByRole("link", { name: "Go back to the homepage" }))

      expect(screen.getByText("Manage efficiently your employees data!")).toBeTruthy()
    })
  }) 
})