import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"; // Assuming this path is correct
import TasksSection from "./TasksSection"; // Assuming this path is correct

import tasksSlice from "../../redux/reducers/tasksSlice";

describe("TasksSection", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksSlice,
      },
    });
  });
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading indicator while fetching tasks", async () => {
    render(
      <Provider store={store}>
        <TasksSection />
      </Provider>
    );
    store.dispatch({
      type: "tasks/fetchTasks/pending",
      payload: [],
    });
    // Use act to wrap the asynchronous code
    await act(async () => {
      // Wait for the async action to be resolved
      await waitFor(() =>
        expect(screen.getByTestId("task-section-loading")).toBeInTheDocument()
      );
    });
  });
  it("render error for rejected response", async () => {
    render(
      <Provider store={store}>
        <TasksSection />
      </Provider>
    );
    store.dispatch({
      type: "tasks/fetchTasks/rejected",
      payload: {
        error: {
          message: "Something wrong",
        },
      },
    });
    console.log("Rendered component:", screen.debug());
    // Wait for the async action to be resolved
    await act(async () => {
      // Wait for the async action to be resolved
      await waitFor(() =>
        expect(screen.getByTestId("task-section-error")).toBeInTheDocument()
      );
    });
  });
  it("display emty data", async () => {
    render(
      <Provider store={store}>
        <TasksSection />
      </Provider>
    );
    store.dispatch({
      type: "tasks/fetchTasks/fulfilled",
      payload: [],
    });
    // Use act to wrap the asynchronous code
    await act(async () => {
      // Wait for the async action to be resolved
      await waitFor(() =>
        expect(screen.getByTestId("task-section-emty")).toBeInTheDocument()
      );
    });
  });
  it("renders tasks correctly with all element:", async () => {
    render(
      <Provider store={store}>
        <TasksSection />
      </Provider>
    );
    store.dispatch({
      type: "tasks/fetchTasks/fulfilled",
      payload: [
        {
          _id: 1,
          title: "fdgh",
          user: "26a0c099-3cba-4284-9662-a5d7e29b12ac",
          checklists: [],
          description: {
            color: "red",
            text: "hello wprd",
          },
        },
      ],
    });
    // Use act to wrap the asynchronous code
    await act(async () => {
      // Wait for the async action to be resolved
      await waitFor(() =>
        expect(screen.getByTestId("tasks-section")).toBeInTheDocument()
      );
      expect(screen.getByTestId("task-section-title")).toBeInTheDocument();
      expect(
        screen.getByTestId("task-section-description")
      ).toBeInTheDocument();
    });
  });

  it("renders butto", async () => {
    render(
      <Provider store={store}>
        <TasksSection />
      </Provider>
    );
    store.dispatch({
      type: "tasks/fetchTasks/fulfilled",
      payload: [
        {
          _id: 1,
          title: "fdgh",
          user: "26a0c099-3cba-4284-9662-a5d7e29b12ac",
          createdAt: 1708437462027,
          updatedAt: 1708437462027,
          description: {
            color: "red",
            text: "hello im ismail Hocine :) ",
          },
        },
      ],
    });
    // Use act to wrap the asynchronous code
    await act(async () => {
      // Wait for the async action to be resolved
      await waitFor(() =>
        expect(screen.getByTestId("tasks-section")).toBeInTheDocument()
      );
    });
  });
});
