import { BrowserRouter, Routes, Route } from "react-router-dom"

import styles from "./App.module.css"

/* ----- Pages ----- */
import Home from "./pages/Home.jsx"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
