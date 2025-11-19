import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7071/api", 
});

// ================================
// 🔹 TRÁMITES
// ================================
export const getTramites = async () => {
  const res = await API.get("/tramites");
  return res.data;
};

export const getTramitesPorUsuario = async (cod_nit) => {
  const res = await API.get(`/tramites/${cod_nit}`);
  return res.data;
};

// ================================
// 🔹 MENSAJES
// ================================
export const getMensajes = async () => {
  const res = await API.get("/mensajes");
  return res.data;
};

export const getMensajesPorUsuario = async (cod_nit) => {
  const res = await API.get(`/mensajes/${cod_nit}`);
  return res.data;
};

// ================================
// 🔹 ENTIDADES
// ================================
export const getEntidades = async () => {
  const res = await API.get("/entidades");
  return res.data;
};

export const getEntidadesPorUsuario = async (cod_nit) => {
  const res = await API.get(`/entidades/${cod_nit}`);
  return res.data;
};
