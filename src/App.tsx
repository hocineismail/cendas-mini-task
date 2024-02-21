import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "@pages/tasks";

import "./style.css";
import Login from "@pages/login";

import PrivateRoutes from "./HOC/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Tasks />} />
        </Route>

        {/*  <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
