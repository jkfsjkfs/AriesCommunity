import { useEffect, useState } from "react";
import { getSolicitudes } from "../services/api";


export default function MisTramites() {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSolicitudes();
        setTramites(data);
      } catch (error) {
        console.error("Error al obtener trámites:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Trámites</h1>
      {tramites.length === 0 ? (
        <p>No hay trámites registrados. {tramites.length} </p>
      ) : (
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Trámite</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Municipio</th>
            </tr>
          </thead>
          <tbody>
            {tramites.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{t.id}</td>
                <td className="px-4 py-2">{t.tramiteNombre}</td>
                <td className="px-4 py-2">{new Date(t.fechaHora).toLocaleString()}</td>
                <td className="px-4 py-2">{t.codMpio || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
