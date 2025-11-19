import { useEffect, useState } from "react";
import {
  EnvelopeIcon,
  CheckIcon,
  XMarkIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

/* ============================================================
   MENSAJES HARDCODEADOS (18) — CONSISTENTES CON ENTIDADES + TRÁMITES
   ============================================================ */

const MENSAJES_DATA = [
  { id: 1, fecha: "2025-04-06", asunto: "Respuesta a Paz y Salvo Tributario", leido: true, tramite: "Paz y Salvo Tributario", entidad: "Chigorodó" },
  { id: 2, fecha: "2025-04-09", asunto: "Confirmación de Certificado de Retefuente", leido: true, tramite: "Certificados de Retefuente", entidad: "Mutatá" },
  { id: 3, fecha: "2025-04-22", asunto: "Factura disponible para descarga", leido: true, tramite: "Facturas", entidad: "Carepa" },
  { id: 4, fecha: "2025-05-01", asunto: "Actualización en tu Cambio de Datos", leido: false, tramite: "Cambio de Datos", entidad: "Dabeiba" },
  { id: 5, fecha: "2025-05-15", asunto: "Recordatorio de vencimiento de factura", leido: true, tramite: "Facturas", entidad: "Chigorodó" },
  { id: 6, fecha: "2025-05-28", asunto: "Nuevo mensaje en tu bandeja", leido: false, tramite: "Mensajería", entidad: "ESP Dabeiba" },
  { id: 7, fecha: "2025-06-03", asunto: "Respuesta a solicitud de Cambio de Datos", leido: true, tramite: "Cambio de Datos", entidad: "Mutatá" },
  { id: 8, fecha: "2025-06-12", asunto: "Cambio de estado en Paz y Salvo Tributario", leido: false, tramite: "Paz y Salvo Tributario", entidad: "Carepa" },
  { id: 9, fecha: "2025-07-01", asunto: "Certificado de Retefuente generado", leido: true, tramite: "Certificados de Retefuente", entidad: "Chigorodó" },
  { id: 10, fecha: "2025-07-10", asunto: "Nuevo mensaje de la entidad", leido: true, tramite: "Mensajería", entidad: "Chigorodó" },
  { id: 11, fecha: "2025-07-12", asunto: "Trámite de Paz y Salvo en proceso", leido: true, tramite: "Paz y Salvo Tributario", entidad: "Dabeiba" },
  { id: 12, fecha: "2025-07-20", asunto: "Notificación del sistema de Mensajería", leido: false, tramite: "Mensajería", entidad: "Mutatá" },
  { id: 13, fecha: "2025-08-01", asunto: "Respuesta de la entidad a tu solicitud", leido: true, tramite: "Certificados de Retefuente", entidad: "Carepa" },
  { id: 14, fecha: "2025-08-03", asunto: "Actualización en una de tus facturas", leido: true, tramite: "Facturas", entidad: "ESP Dabeiba" },
  { id: 15, fecha: "2025-08-05", asunto: "Nuevo documento disponible", leido: true, tramite: "Facturas", entidad: "Chigorodó" },
  { id: 16, fecha: "2025-08-06", asunto: "Advertencia importante sobre tu trámite", leido: false, tramite: "Mensajería", entidad: "Dabeiba" },
  { id: 17, fecha: "2025-08-14", asunto: "Respuesta a tu Paz y Salvo Tributario", leido: true, tramite: "Paz y Salvo Tributario", entidad: "Mutatá" },
  { id: 18, fecha: "2025-08-15", asunto: "Cambio de estado en Mensajería", leido: false, tramite: "Mensajería", entidad: "Chigorodó" },
];

export default function MisMensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMensajes(MENSAJES_DATA);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <p>Cargando...</p>;

  const total = mensajes.length;
  const leidos = mensajes.filter((m) => m.leido).length;
  const noLeidos = total - leidos;

  const abrirDetalle = (msg) => {
    setDetalle(msg);

    // marcar como leído
    if (!msg.leido) {
      setMensajes((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, leido: true } : m
        )
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Mis Mensajes</h1>
      <p className="text-sm text-gray-600 mb-4">
        Total: <span className="font-semibold">{total}</span> &nbsp;|&nbsp;
        Leídos: <span className="font-semibold text-green-700">{leidos}</span> &nbsp;|&nbsp;
        No leídos: <span className="font-semibold text-red-600">{noLeidos}</span>
      </p>

      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Asunto</th>
            <th className="px-4 py-2 text-left">Trámite</th>
            <th className="px-4 py-2 text-left">Entidad</th>
            <th className="px-4 py-2 text-left">Fecha</th>
          </tr>
        </thead>

        <tbody>
          {mensajes.map((m) => (
            <tr
              key={m.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => abrirDetalle(m)}
            >
              <td className="px-4 py-2">
                {m.leido ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                    <CheckIcon className="h-4 w-4" />
                    Leído
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                    <EnvelopeIcon className="h-4 w-4" />
                    No leído
                  </span>
                )}
              </td>
              <td className="px-4 py-2">{m.asunto}</td>
              <td className="px-4 py-2">{m.tramite}</td>
              <td className="px-4 py-2">{m.entidad}</td>
              <td className="px-4 py-2">
                {new Date(m.fecha).toLocaleDateString("es-CO")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ============================================================
            MODAL DETALLE DEL MENSAJE
      ============================================================ */}
      {detalle && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold">
                {detalle.asunto}
              </h2>

              <XMarkIcon
                className="h-6 w-6 cursor-pointer text-gray-700 hover:text-red-500"
                onClick={() => setDetalle(null)}
              />
            </div>

            {/* INFORMACIÓN BÁSICA */}
            <p><strong>Entidad:</strong> {detalle.entidad}</p>
            <p><strong>Trámite asociado:</strong> {detalle.tramite}</p>
            <p><strong>Fecha:</strong> {new Date(detalle.fecha).toLocaleDateString("es-CO")}</p>

            {/* CUERPO DEL MENSAJE */}
            <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm leading-relaxed">
              <p>
                Este es un mensaje enviado por la entidad <strong>{detalle.entidad}</strong>
                {" "}en relación con tu trámite de <strong>{detalle.tramite}</strong>.  
                Debido al enfoque demo, el texto está simulado, pero representa la estructura real de una notificación.
              </p>
            </div>

            {/* ADJUNTO (PDF) */}
            <div className="mt-6 bg-gray-50 border rounded-lg p-4">
              <h3 className="font-bold mb-2">Documento adjunto</h3>

              <div className="flex items-center justify-between text-sm bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <DocumentIcon className="h-6 w-6 text-red-600" />

                  <span>
                    Mensaje_{detalle.tramite.replace(/\s+/g, "_")}_ID{detalle.id}.pdf
                  </span>
                </div>

                <a
                  href="/Dummy.pdf"
                  download={`Mensaje_${detalle.tramite.replace(/\s+/g, "_")}_ID${detalle.id}.pdf`}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
                >
                  <DocumentIcon className="h-5 w-5" />
                  Descargar
                </a>
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
