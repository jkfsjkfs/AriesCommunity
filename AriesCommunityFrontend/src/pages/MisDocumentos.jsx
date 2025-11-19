import { useState } from "react";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MisDocumentos() {
  const documentos = [
    // ---- Paz y Salvo Tributario ----
    {
      id: 1,
      nombre: "PazYSalvo_Chigorodo_Abril2025.pdf",
      tramite: "Paz y Salvo Tributario",
      entidad: "Chigorodó",
      fecha: "2025-04-10",
      url: "/Dummy.pdf",
    },
    {
      id: 2,
      nombre: "PazYSalvo_Carepa_Julio2025.pdf",
      tramite: "Paz y Salvo Tributario",
      entidad: "Carepa",
      fecha: "2025-07-05",
      url: "/Dummy.pdf",
    },
    {
      id: 3,
      nombre: "PazYSalvo_Mutata_Enero2025.pdf",
      tramite: "Paz y Salvo Tributario",
      entidad: "Mutatá",
      fecha: "2025-01-14",
      url: "/Dummy.pdf",
    },

    // ---- Certificados de Retefuente ----
    {
      id: 4,
      nombre: "Retefuente_Chigorodo_2025.pdf",
      tramite: "Certificados de Retefuente",
      entidad: "Chigorodó",
      fecha: "2025-02-20",
      url: "/Dummy.pdf",
    },
    {
      id: 5,
      nombre: "Retefuente_Carepa_2024.pdf",
      tramite: "Certificados de Retefuente",
      entidad: "Carepa",
      fecha: "2024-12-15",
      url: "/Dummy.pdf",
    },
    {
      id: 6,
      nombre: "Retefuente_Dabeiba_2023.pdf",
      tramite: "Certificados de Retefuente",
      entidad: "Dabeiba",
      fecha: "2023-12-10",
      url: "/Dummy.pdf",
    },

    // ---- Facturas ----
    {
      id: 7,
      nombre: "Factura_ESP_Enero2025.pdf",
      tramite: "Facturas",
      entidad: "ESP Dabeiba",
      fecha: "2025-01-05",
      url: "/Dummy.pdf",
    },
    {
      id: 8,
      nombre: "Factura_ESP_Julio2025.pdf",
      tramite: "Facturas",
      entidad: "ESP Dabeiba",
      fecha: "2025-07-10",
      url: "/Dummy.pdf",
    },
    {
      id: 9,
      nombre: "Factura_ESP_Agosto2025.pdf",
      tramite: "Facturas",
      entidad: "ESP Dabeiba",
      fecha: "2025-08-03",
      url: "/Dummy.pdf",
    },

    // ---- Cambio de Datos ----
    {
      id: 10,
      nombre: "Constancia_CambioDatos_Dabeiba2025.pdf",
      tramite: "Cambio de Datos",
      entidad: "Dabeiba",
      fecha: "2025-06-28",
      url: "/Dummy.pdf",
    },
    {
      id: 11,
      nombre: "CambioDireccion_Mutata2025.pdf",
      tramite: "Cambio de Datos",
      entidad: "Mutatá",
      fecha: "2025-06-12",
      url: "/Dummy.pdf",
    },

    // ---- Mensajería ----
    {
      id: 12,
      nombre: "Comunicado_Chigorodo_2025.pdf",
      tramite: "Mensajería",
      entidad: "Chigorodó",
      fecha: "2025-07-22",
      url: "/Dummy.pdf",
    },

    // Para completar el grid 4x4 (16 items)
    {
      id: 13,
      nombre: "Factura_ESP_Junio2025.pdf",
      tramite: "Facturas",
      entidad: "ESP Dabeiba",
      fecha: "2025-06-10",
      url: "/Dummy.pdf",
    },
    {
      id: 14,
      nombre: "Retefuente_Carepa_2022.pdf",
      tramite: "Certificados de Retefuente",
      entidad: "Carepa",
      fecha: "2022-12-08",
      url: "/Dummy.pdf",
    },
    {
      id: 15,
      nombre: "PazYSalvo_Chigorodo_2023.pdf",
      tramite: "Paz y Salvo Tributario",
      entidad: "Chigorodó",
      fecha: "2023-03-22",
      url: "/Dummy.pdf",
    },
    {
      id: 16,
      nombre: "Comunicado_Dabeiba_2024.pdf",
      tramite: "Mensajería",
      entidad: "Dabeiba",
      fecha: "2024-05-18",
      url: "/Dummy.pdf",
    },
  ];

  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <DocumentIcon className="h-7 w-7 text-blue-600" />
        Mis Documentos
      </h1>

      {/* Grid fija 4x4 */}
      <div className="grid grid-cols-4 grid-rows-4 gap-6">
        {documentos.slice(0, 16).map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-3 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <DocumentIcon className="h-8 w-8 text-red-500" />
              <div className="truncate">
                <p className="text-sm font-semibold text-gray-800 truncate w-32">
                  {doc.nombre}
                </p>
                <p className="text-xs text-gray-500">{doc.tramite}</p>
                <p className="text-xs text-gray-400">Entidad: {doc.entidad}</p>
                <p className="text-xs text-gray-400">Fecha: {doc.fecha}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedDoc(doc)}
              className="mt-auto px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ver documento
            </button>
          </div>
        ))}
      </div>

      {/* Modal PDF */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 lg:w-3/4 h-5/6 rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-2 bg-blue-50">
              <h2 className="font-semibold text-gray-700">
                {selectedDoc.nombre} - {selectedDoc.tramite} ({selectedDoc.entidad})
              </h2>
              <XMarkIcon
                className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500"
                onClick={() => setSelectedDoc(null)}
              />
            </div>

            {/* PDF embebido */}
            <div className="flex-1">
              <iframe
                src={selectedDoc.url}
                title={selectedDoc.nombre}
                className="w-full h-full rounded-b-lg"
              />
            </div>

            {/* Footer */}
            <div className="border-t px-4 py-2 text-sm text-gray-500">
              Fecha del documento: {selectedDoc.fecha}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
