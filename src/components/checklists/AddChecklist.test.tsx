import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import AddChecklist from "./AddChecklist";
import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "@store/reducers/tasksSlice";
import { Provider } from "react-redux";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      tasks: tasksSlice,
    },
  });
});

describe("AddChecklist Component", () => {
  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <AddChecklist task_id="1" />
      </Provider>
    );
    expect(screen.getByTestId("btn-add-item")).toBeInTheDocument();
  });

  it("opens modal on button click", async () => {
    render(
      <Provider store={store}>
        <AddChecklist task_id="1" />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("btn-add-item"));

    await waitFor(() => {
      // Check if the "Save" button is present in the modal
      expect(screen.getByText("Save")).toBeInTheDocument();

      // Ensure that the modal is open
      expect(screen.getByTestId("modal")).toBeTruthy();
    });
  });

  it("renders all input and works correctly", async () => {
    render(
      <Provider store={store}>
        <AddChecklist task_id="ggggg" />
      </Provider>
    );

    // Open modal and check inputs
    fireEvent.click(screen.getByTestId("btn-add-item"));

    const inputName = screen.getByTestId(
      "item-name"
    ) as HTMLInputElement | null;

    // Ensure input exists in the form component
    expect(inputName).toBeTruthy();

    // Ensure input is initially empty
    expect(inputName?.textContent).toBe("");

    if (inputName) {
      // Test setting the input text
      inputName.textContent = "Item one";
      expect(inputName.textContent).toBe("Item one");

      // Test the type prop
      expect(inputName.type).toBe("text");

      // Test the name prop
      expect(inputName.name).toBe("checklist");

      // Test the value prop
      fireEvent.change(inputName, {
        target: {
          value: "checklist",
        },
      });
      expect(inputName.value).toBe("checklist");

      // Test the required prop with jest-dom
      expect(inputName).toBeRequired();
    }
  });
});
