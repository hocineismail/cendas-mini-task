import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute component", () => {
  it("renders Outlet when username is in localStorage", () => {
    // Mocking localStorage.getItem
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue("testUser");

    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );

    // Expect the Outlet to be rendered when username is in localStorage
    expect(screen.queryByTestId("outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
  });

  it("renders Navigate to /login when username is not in localStorage", () => {
    // Mocking localStorage.getItem
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );

    // Expect the Navigate component to /login to be rendered when username is not in localStorage
    expect(screen.queryByTestId("outlet")).not.toBeInTheDocument();
    expect(screen.queryByTestId("navigate")).toBeInTheDocument();
    expect(screen.getByTestId("navigate")).toHaveAttribute("to", "/login");
  });
});
