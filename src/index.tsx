import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

//impliment redux for state management
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { register } from "./register";

const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
register();
