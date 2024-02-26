import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TasksContextProvider from "./context/TasksContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
        <ToastContainer />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
