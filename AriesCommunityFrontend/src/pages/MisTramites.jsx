import { useEffect, useState } from "react";
import {
  XMarkIcon,
  DocumentIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { emitirTramiteNuevo } from "../utils/eventBus"; // ✅ IMPORTANTE: import EventBus

/* ============================================================
   TRÁMITES HARDCODEADOS (32)
   ============================================================ */

const TRAMITES_DATA = [
  // ---- Chigorodó (10 trámites) ----
  { id: 1, nombre: "Paz y Salvo Tributario", fecha: "2025-03-05", entidad: "Chigorodó" },
  { id: 2, nombre: "Paz y Salvo Tributario", fecha: "2025-03-12", entidad: "Chigorodó" },
  { id: 3, nombre: "Paz y Salvo Tributario", fecha: "2025-03-22", entidad: "Chigorodó" },
  { id: 4, nombre: "Facturas", fecha: "2025-04-02", entidad: "Chigorodó" },
  { id: 5, nombre: "Facturas", fecha: "2025-04-12", entidad: "Chigorodó" },
  { id: 6, nombre: "Certificados de Retefuente", fecha: "2025-05-02", entidad: "Chigorodó" },
  { id: 7, nombre: "Paz y Salvo Tributario", fecha: "2025-06-15", entidad: "Chigorodó" },
  { id: 8, nombre: "Cambio de Datos", fecha: "2025-07-03", entidad: "Chigorodó" },
  { id: 9, nombre: "Mensajería", fecha: "2025-07-22", entidad: "Chigorodó" },
  { id: 10, nombre: "Mensajería", fecha: "2025-08-10", entidad: "Chigorodó" },

  // ---- Mutatá (6 trámites) ----
  { id: 11, nombre: "Certificados de Retefuente", fecha: "2025-03-16", entidad: "Mutatá" },
  { id: 12, nombre: "Paz y Salvo Tributario", fecha: "2025-04-20", entidad: "Mutatá" },
  { id: 13, nombre: "Facturas", fecha: "2025-05-10", entidad: "Mutatá" },
  { id: 14, nombre: "Facturas", fecha: "2025-06-01", entidad: "Mutatá" },
  { id: 15, nombre: "Cambio de Datos", fecha: "2025-06-25", entidad: "Mutatá" },
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
  { id: 26, nombre: "Certificados de Retefuente", fecha: "2025-06-12", entidad: "Dabeiba" },
  { id: 27, nombre: "Mensajería", fecha: "2025-07-30", entidad: "Dabeiba" },
  { id: 28, nombre: "Paz y Salvo Tributario", fecha: "2025-08-11", entidad: "Dabeiba" },

  // ---- ESP Dabeiba (4 trámites) ----
  { id: 29, nombre: "Facturas", fecha: "2025-07-01", entidad: "ESP Dabeiba" },
  { id: 30, nombre: "Facturas", fecha: "2025-07-10", entidad: "ESP Dabeiba" },
  { id: 31, nombre: "Cambio de Datos", fecha: "2025-08-04", entidad: "ESP Dabeiba" },
  { id: 32, nombre: "Certificados de Retefuente", fecha: "2025-08-15", entidad: "ESP Dabeiba" },
];

/* ============================================================
        COMPONENTE PRINCIPAL
============================================================ */

export default function MisTramites() {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTramites(TRAMITES_DATA);
      setLoading(false);
    }, 400);
  }, []);

  // ✅ NUEVO: ESCUCHAR EVENTO PARA AGREGAR TRÁMITE
  useEffect(() => {
    const handler = (e) => {
      setTramites((prev) => [e.detail, ...prev]); // agrega al inicio
    };

    window.addEventListener("tramite-nuevo", handler);
    return () => window.removeEventListener("tramite-nuevo", handler);
  }, []);

  if (loading) return <p>Cargando...</p>;

  const estadoTramite = (id) =>
    id % 5 === 0 || id % 7 === 0 ? "En proceso" : "Finalizado";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Trámites</h1>

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
            <tr
              key={t.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => setDetalle(t)}
            >
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

      {/* ============================================================
              MODAL DETALLE DEL TRÁMITE (NO SE TOCÓ NADA)
      ============================================================ */}
      {detalle && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold">
                Trámite #{detalle.id} — {detalle.nombre}
              </h2>

              <XMarkIcon
                className="h-6 w-6 cursor-pointer text-gray-700 hover:text-red-500"
                onClick={() => setDetalle(null)}
              />
            </div>

            {/* INFORMACIÓN BÁSICA */}
            <p><strong>Entidad:</strong> {detalle.entidad}</p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(detalle.fecha).toLocaleDateString("es-CO")}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {estadoTramite(detalle.id) === "Finalizado" ? (
                <span className="inline-flex items-center gap-1 text-green-700">
                  <CheckCircleIcon className="h-5 w-5" /> Finalizado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-yellow-700">
                  <ClockIcon className="h-5 w-5" /> En proceso
                </span>
              )}
            </p>

            {/* SEGUIMIENTO */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">Seguimiento</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>📌 Registro de trámite</li>
                <li>📄 Documentación revisada</li>
                <li>🔍 Evaluación por la entidad</li>
                {estadoTramite(detalle.id) === "Finalizado" ? (
                  <li>✅ Trámite finalizado</li>
                ) : (
                  <li>⏳ Pendiente por revisión final</li>
                )}
              </ul>
            </div>

            {/* DOCUMENTOS — NO SE CAMBIÓ NADA */}
            <div className="mt-6 bg-gray-50 border rounded-lg p-4">
              <h3 className="font-bold mb-2">Documentos relacionados</h3>

              <div className="flex items-center justify-between text-sm bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <DocumentIcon className="h-6 w-6 text-red-600" />

                  <span className="font-medium text-gray-700">
                    {detalle.nombre.replace(/\s+/g, "_")}_{detalle.entidad.replace(/\s+/g, "_")}_ID{detalle.id}.pdf
                  </span>
                </div>

                <a
                  href="/Dummy.pdf"
                  download={`${detalle.nombre.replace(/\s+/g, "_")}_${detalle.entidad.replace(
                    /\s+/g,
                    "_"
                  )}_ID${detalle.id}.pdf`}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
                >
                  <DocumentIcon className="h-5 w-5 text-white" />
                  Descargar
                </a>
              </div>
            </div>

            {/* MENSAJES */}
            <div className="mt-6 bg-gray-50 border rounded-lg p-4">
              <h3 className="font-bold mb-2">Mensajes asociados</h3>
              <div className="flex items-center gap-2 text-sm">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-blue-600" />
                Notificación reciente de {detalle.entidad}
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDetalle(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
