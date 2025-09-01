import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Dashboard from "./layout/Dashboard";
import MisTramites from "./pages/MisTramites";

import MisEntidades from "./pages/MisEntidades";
import MisDocumentos from "./pages/MisDocumentos";
import CompletarPerfil from "./pages/CompletarPerfil";


import SolicitarTramite from "./pages/SolicitarTramite";
import Mensajes from "./pages/Mensajes";
import App from "./App"; 
import Login from "./pages/Login";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          {/* Landing inicial */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard con rutas hijas */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* 👇 Ruta "Inicio" */}
            <Route index element={<div />} />
            

            <Route path="mis-tramites" element={<MisTramites />} />
            <Route path="mis-entidades" element={<MisEntidades />} />
            <Route path="solicitar-tramite" element={<SolicitarTramite />} />
            <Route path="mis-documentos" element={<MisDocumentos />} />
            <Route path="completar-perfil" element={<CompletarPerfil />} />
            

            <Route path="mensajes" element={<Mensajes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
