import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function SolicitarTramite() {
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectedTramite, setSelectedTramite] = useState("");
  const [mensaje, setMensaje] = useState("");

  // ENTIDADES OFICIALES - coherentes con el sistema
  const entidades = [
    "Chigorodó",
    "Mutatá",
    "Carepa",
    "Dabeiba",
    "ESP Dabeiba",
  ];

  // TRÁMITES OFICIALES DEL CATALOGO REAL
  const tramites = [
    "Paz y Salvo Tributario",
    "Certificados de Retefuente",
    "Facturas",
    "Cambio de Datos",
    "Mensajería",
  ];

  const addEntity = (e) => {
    const value = e.target.value;
    if (value && !selectedEntities.includes(value)) {
      setSelectedEntities([...selectedEntities, value]);
    }
    e.target.value = ""; // reset
  };

  const removeEntity = (entity) => {
    setSelectedEntities(selectedEntities.filter((e) => e !== entity));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `📩 Solicitud enviada\n\n` +
      `Entidades: ${
        selectedEntities.length > 0 ? selectedEntities.join(", ") : "Todas"
      }\n` +
      `Trámite: ${selectedTramite}\n` +
      `Mensaje: ${mensaje}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border border-blue-200">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-800">
        Solicitar Trámite
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ENTIDADES */}
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-2">
            Selecciona Entidades
          </label>

          <select
            onChange={addEntity}
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">-- Selecciona Entidades --</option>
            {entidades.map((entidad, idx) => (
              <option key={idx} value={entidad}>
                {entidad}
              </option>
            ))}
          </select>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedEntities.map((entidad, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow"
              >
                {entidad}
                <XMarkIcon
                  className="h-4 w-4 cursor-pointer hover:text-gray-200"
                  onClick={() => removeEntity(entidad)}
                />
              </span>
            ))}
          </div>

          {selectedEntities.length === 0 && (
            <p className="text-sm text-gray-500 mt-2 italic">
              * Si no seleccionas entidades, la solicitud se enviará a todas las entidades.
            </p>
          )}
        </div>

        {/* TRÁMITE */}
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-2">
            Selecciona un Trámite
          </label>
          <select
            value={selectedTramite}
            onChange={(e) => setSelectedTramite(e.target.value)}
            required
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">-- Selecciona un trámite --</option>
            {tramites.map((tramite, idx) => (
              <option key={idx} value={tramite}>
                {tramite}
              </option>
            ))}
          </select>
        </div>

        {/* MENSAJE */}
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-2">
            Mensaje
          </label>
          <textarea
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>

        {/* BOTÓN */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow font-semibold"
          >
            🚀 Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}
