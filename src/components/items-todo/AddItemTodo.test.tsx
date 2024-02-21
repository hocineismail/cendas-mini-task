import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddItemTodo from "./AddItemTodo";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"; // Assuming this path is correct
// Mock your redux hooks or providers if needed
import tasksSlice from "../../redux/reducers/tasksSlice";
import { Provider } from "react-redux";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      tasks: tasksSlice,
    },
  });
});

describe("AddItemTodo Component", () => {
  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <AddItemTodo checklist_id="1" task_id="ggggg" />
      </Provider>
    );
    // Add more specific assertions based on your component's behavior
    expect(screen.getByTestId("btn-add-item")).toBeInTheDocument();
  });

  it("opens modal on button click", async () => {
    render(
      <Provider store={store}>
        <AddItemTodo checklist_id="1" task_id="ggggg" />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("btn-add-item"));

    await waitFor(() => {
      // check moda
      expect(screen.getByText("Save")).toBeInTheDocument();

      //modal should be open
      expect(screen.getByTestId("modal")).toBeTruthy();
    });
  });
  it("render all input and work correctly", async () => {
    render(
      <Provider store={store}>
        <AddItemTodo checklist_id="1" task_id="ggggg" />
      </Provider>
    );
    //open modal and check inputs
    fireEvent.click(screen.getByTestId("btn-add-item"));

    const inputName = screen.getByTestId(
      "item-name"
    ) as HTMLInputElement | null;
    const inputDescription = screen.getByTestId(
      "item-description"
    ) as HTMLInputElement | null;
    // input exists in the form component

    expect(inputName).toBeTruthy();
    // is empty
    expect(inputName?.textContent).toBe("");

    if (inputName) {
      // test the input text
      inputName.textContent = "Item one";
      expect(inputName.textContent).toBe("Item one");

      // test the type prop
      expect(inputName.type).toBe("text");

      // test the name prop
      expect(inputName.name).toBe("task");

      // test the value prop
      fireEvent.change(inputName, {
        target: {
          value: "task",
        },
      });
      expect(inputName.value).toBe("task");

      // test the required prop with the jest-dom
      expect(inputName).toBeRequired();
    }

    if (inputDescription) {
      // test the input text
      inputDescription.textContent = "inputDescription";
      expect(inputDescription.textContent).toBe("inputDescription");

      // test the type prop
      expect(inputDescription.type).toBe("text");
      expect(inputDescription.name).toBe("description");
    }
    // test the name prop

    const selectEmoji = screen.getByTestId("emoji-2");
    expect(selectEmoji).toBeInTheDocument();
    const colorEmoji = screen.getByTestId("color-2");
    expect(colorEmoji).toBeInTheDocument();
  });
});
