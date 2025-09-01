import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7071/api", // ⚠️ Ajusta el puerto según tu backend
});

// Obtener todas las solicitudes
export const getSolicitudes = async () => {
  const res = await API.get("/solicitudes");
  return res.data;
};

// Obtener solicitudes por usuario
export const getSolicitudesPorUsuario = async (cod_nit) => {
  const res = await API.get(`/solicitudes/${cod_nit}`);
  return res.data;
};
