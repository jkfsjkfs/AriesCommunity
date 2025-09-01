import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Mensajes() {
  // Mock data de mensajes
  const mensajes = [
    {
      id: 1,
      remitente: "Secretaría de Hacienda",
      asunto: "Respuesta a su solicitud de Paz y Salvo",
      fecha: "26/08/2025",
      leido: true,
    },
    {
      id: 2,
      remitente: "Planeación Municipal",
      asunto: "Licencia de construcción aprobada",
      fecha: "25/08/2025",
      leido: false,
    },
    {
      id: 3,
      remitente: "ESP Dabeiba",
      asunto: "Notificación de corte programado",
      fecha: "22/08/2025",
      leido: true,
    },
    {
      id: 4,
      remitente: "Secretaría de Tránsito",
      asunto: "Multa pendiente por resolver",
      fecha: "20/08/2025",
      leido: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <EnvelopeIcon className="h-6 w-6" /> Bandeja de Mensajes
        </h1>
      </div>

      <ul className="divide-y divide-gray-200">
        {mensajes.map((msg) => (
          <li
            key={msg.id}
            className={`px-6 py-4 flex justify-between items-center cursor-pointer transition ${
              msg.leido
                ? "bg-white hover:bg-blue-50"
                : "bg-blue-50 hover:bg-blue-100"
            }`}
          >
            {/* Columna izquierda */}
            <div>
              <p className="text-sm font-semibold text-blue-800">
                {msg.remitente}
              </p>
              <p
                className={`text-sm ${
                  msg.leido ? "text-gray-600" : "text-gray-900 font-bold"
                }`}
              >
                {msg.asunto}
              </p>
            </div>

            {/* Columna derecha */}
            <div className="text-right">
              <p className="text-xs text-gray-500">{msg.fecha}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  msg.leido
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.leido ? "Leído" : "No leído"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
