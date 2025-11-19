import { useState } from "react";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function MisEntidades() {
  const [entidades] = useState([
    { nombre: "Chigorodó", registrados: 10, resueltos: 8 },
    { nombre: "Mutatá", registrados: 6, resueltos: 5 },
    { nombre: "Carepa", registrados: 7, resueltos: 7 },
    { nombre: "Dabeiba", registrados: 5, resueltos: 3 },
    { nombre: "ESP Dabeiba", registrados: 4, resueltos: 3 },
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <BuildingOffice2Icon className="h-7 w-7 text-blue-600" />
        Mis Entidades
      </h1>

      {/* Lista de entidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {entidades.map((entidad, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm"
          >
            {/* Nombre */}
            <span className="font-medium text-blue-800">{entidad.nombre}</span>

            {/* Resumen */}
            <div className="text-right">
              <p className="text-sm text-gray-700">
                Registrados:{" "}
                <span className="font-semibold text-blue-700">
                  {entidad.registrados}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Resueltos:{" "}
                <span className="font-semibold text-green-600">
                  {entidad.resueltos}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
