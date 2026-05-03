import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Home from "./pages/Principal/Home.jsx";
import CheckList from "./pages/CheckList/CheckList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Checklist" element={<CheckList/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
