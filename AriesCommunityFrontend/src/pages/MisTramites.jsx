import { useEffect, useState } from "react";

/* ============================================================
   TRÁMITES HARDCODEADOS (32) — COHERENTES CON TUS ENTIDADES
   ============================================================ */

const TRAMITES_DATA = [
  // ---- Chigorodó (10 trámites) ----
  { id: 1, nombre: "Paz y Salvo Tributario", fecha: "2025-03-05", entidad: "Chigorodó" },
  { id: 2, nombre: "Paz y Salvo Tributario", fecha: "2025-03-12", entidad: "Chigorodó" },
  { id: 3, nombre: "Paz y Salvo Tributario", fecha: "2025-03-22", entidad: "Chigorodó" },
  { id: 4, nombre: "Facturas", fecha: "2025-04-02", entidad: "Chigorodó" },
  { id: 5, nombre: "Facturas", fecha: "2025-04-12", entidad: "Chigorodó" },
  { id: 6, nombre: "Certificados de Retefuente", fecha: "2025-05-02", entidad: "Chigorodó" },
  { id: 7, nombre: "Paz y Salvo Tributario", fecha: "2025-06-15", entidad: "Chigorodó" }, // pendiente
  { id: 8, nombre: "Cambio de Datos", fecha: "2025-07-03", entidad: "Chigorodó" },
  { id: 9, nombre: "Mensajería", fecha: "2025-07-22", entidad: "Chigorodó" },
  { id: 10, nombre: "Mensajería", fecha: "2025-08-10", entidad: "Chigorodó" },

  // ---- Mutatá (6 trámites) ----
  { id: 11, nombre: "Certificados de Retefuente", fecha: "2025-03-16", entidad: "Mutatá" },
  { id: 12, nombre: "Paz y Salvo Tributario", fecha: "2025-04-20", entidad: "Mutatá" },
  { id: 13, nombre: "Facturas", fecha: "2025-05-10", entidad: "Mutatá" },
  { id: 14, nombre: "Facturas", fecha: "2025-06-01", entidad: "Mutatá" },
  { id: 15, nombre: "Cambio de Datos", fecha: "2025-06-25", entidad: "Mutatá" }, // pendiente
  { id: 16, nombre: "Mensajería", fecha: "2025-07-14", entidad: "Mutatá" },

  // ---- Carepa (7 trámites) ----
  { id: 17, nombre: "Facturas", fecha: "2025-03-01", entidad: "Carepa" },
  { id: 18, nombre: "Paz y Salvo Tributario", fecha: "2025-04-03", entidad: "Carepa" },
  { id: 19, nombre: "Paz y Salvo Tributario", fecha: "2025-04-15", entidad: "Carepa" },
  { id: 20, nombre: "Facturas", fecha: "2025-05-22", entidad: "Carepa" },
  { id: 21, nombre: "Certificados de Retefuente", fecha: "2025-05-30", entidad: "Carepa" },
  { id: 22, nombre: "Cambio de Datos", fecha: "2025-06-08", entidad: "Carepa" },
  { id: 23, nombre: "Paz y Salvo Tributario", fecha: "2025-07-05", entidad: "Carepa" },

  // ---- Dabeiba (5 trámites) ----
  { id: 24, nombre: "Facturas", fecha: "2025-03-18", entidad: "Dabeiba" },
  { id: 25, nombre: "Cambio de Datos", fecha: "2025-04-28", entidad: "Dabeiba" },
  { id: 26, nombre: "Certificados de Retefuente", fecha: "2025-06-12", entidad: "Dabeiba" }, // pendiente
  { id: 27, nombre: "Mensajería", fecha: "2025-07-30", entidad: "Dabeiba" },
  { id: 28, nombre: "Paz y Salvo Tributario", fecha: "2025-08-11", entidad: "Dabeiba" },

  // ---- ESP Dabeiba (4 trámites) ----
  { id: 29, nombre: "Facturas", fecha: "2025-07-01", entidad: "ESP Dabeiba" },
  { id: 30, nombre: "Facturas", fecha: "2025-07-10", entidad: "ESP Dabeiba" },
  { id: 31, nombre: "Cambio de Datos", fecha: "2025-08-04", entidad: "ESP Dabeiba" },
  { id: 32, nombre: "Certificados de Retefuente", fecha: "2025-08-15", entidad: "ESP Dabeiba" }, // pendiente
];

export default function MisTramites() {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga real
    setTimeout(() => {
      setTramites(TRAMITES_DATA);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Trámites</h1>

      {tramites.length === 0 ? (
        <p>No hay trámites registrados.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Trámite</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Entidad</th>
            </tr>
          </thead>

          <tbody>
            {tramites.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{t.id}</td>
                <td className="px-4 py-2">{t.nombre}</td>
                <td className="px-4 py-2">
                  {new Date(t.fecha).toLocaleDateString("es-CO")}
                </td>
                <td className="px-4 py-2">{t.entidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
