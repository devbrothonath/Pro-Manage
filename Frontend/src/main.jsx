import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TasksContextProvider } from "./context/TasksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TasksContextProvider>
      <App />
      <ToastContainer />
    </TasksContextProvider>
  </React.StrictMode>
);
