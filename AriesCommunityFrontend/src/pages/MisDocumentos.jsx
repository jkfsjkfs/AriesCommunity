import { useState } from "react";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";



export default function MisDocumentos() {
  const documentos = [
    { id: 1, nombre: "Certificado_PazYSalvo.pdf", tramite: 1012, fecha: "2025-08-20", url: "/Dummy.pdf" },
    { id: 2, nombre: "Licencia_Construccion.pdf", tramite: 1023, fecha: "2025-08-18", url: "/Dummy.pdf" },
    { id: 3, nombre: "Registro_Industria.pdf", tramite: 1030, fecha: "2025-08-15", url: "/Dummy.pdf" },
    { id: 4, nombre: "Permiso_Evento.pdf", tramite: 1041, fecha: "2025-08-12", url: "/Dummy.pdf" },
    { id: 5, nombre: "Certificado_Residencia.pdf", tramite: 1048, fecha: "2025-08-10", url: "/Dummy.pdf" },
    { id: 6, nombre: "Trámite_Agropecuario.pdf", tramite: 1050, fecha: "2025-08-08", url: "/Dummy.pdf" },
    { id: 7, nombre: "Licencia_Transporte.pdf", tramite: 1060, fecha: "2025-08-06", url: "/Dummy.pdf" },
    { id: 8, nombre: "Permiso_Terreno.pdf", tramite: 1065, fecha: "2025-08-02", url: " /Dummy.pdf" },
    { id: 9, nombre: "Otro_Documento.pdf", tramite: 1068, fecha: "2025-07-30", url: "/Dummy.pdf" },
    // agrega hasta 16 para ver el 4x4 lleno
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
                <p className="text-xs text-gray-500">Trámite #{doc.tramite}</p>
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

      {/* Modal con PDF */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 lg:w-3/4 h-5/6 rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-2 bg-blue-50">
              <h2 className="font-semibold text-gray-700">
                {selectedDoc.nombre} - Trámite #{selectedDoc.tramite}
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
              Fecha del trámite: {selectedDoc.fecha}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
