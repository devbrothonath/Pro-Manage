import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

/* ----- Pages ----- */
import Home from "./pages/Home.jsx";
import TaskPage from "./pages/TaskPage/TaskPage.jsx";
import EditTask from "./pages/EditTask.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/card/:id" element={<TaskPage />} />
            <Route path="/card/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
