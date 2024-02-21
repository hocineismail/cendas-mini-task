import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

//impliment redux for state management
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { register } from "./register";

const rootElement = document.getElementById("root") as HTMLElement;
// import * as serviceWorker from "./serviceWorker";

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
<<<<<<< HEAD

=======
register();
>>>>>>> offline
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js") // Path to your service worker file
//       .then((registration) => {
//         console.log(
//           "Service Worker registered with scope:",
//           registration.scope
//         );
//       })
//       .catch((err) => {
//         console.error("Service Worker registration failed:", err);
//       });
//   });
// }
