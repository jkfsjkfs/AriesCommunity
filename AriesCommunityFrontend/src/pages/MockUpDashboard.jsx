import {
  DocumentCheckIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MockUpDashboard() {
  // === ESTADOS (ahora dinámicos) ===
  const [tramitesRealizados, setTramitesRealizados] = useState(32);
  const [respuestasRecibidas] = useState(26);
  const [tramitesPendientes] = useState(6);

  const [mensajesTotal] = useState(18);
  const [mensajesLeidos] = useState(12);
  const [mensajesNoLeidos] = useState(6);

  const [entidadesVinculadas] = useState(7);

  const ultimoAcceso = "27/08/2025 - 10:45 AM";

const [data, setData] = useState([
  { name: "Junio", tramites: 4 },
  { name: "Julio", tramites: 5 },
  { name: "Agosto", tramites: 3 },
  { name: "Septiembre", tramites: 6 },
  { name: "Octubre", tramites: 7 },
  { name: "Noviembre", tramites: 7 }, // <-- el mes que aumentaremos
]);


  // ============================================================
  //   LISTENER PARA TRÁMITES NUEVOS (desde SolicitarTramite)
  // ============================================================
  useEffect(() => {
    const handler = () => {
      // 1. Aumentar trámites realizados
      setTramitesRealizados((prev) => prev + 1);

      // 2. Actualizar gráfica (aumentamos el valor de Agosto)
      setData((prev) => {
        const updated = [...prev];
        updated[5].tramites = updated[5].tramites + 1;
        return updated;
      });
    };

    window.addEventListener("tramite-nuevo", handler);
    return () => window.removeEventListener("tramite-nuevo", handler);
  }, []);

  // ============================================================
  //      UI ORIGINAL — SIN CAMBIAR NADA
  // ============================================================

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Trámites realizados */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <DocumentCheckIcon className="h-10 w-10 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Trámites Realizados</p>
            <p className="text-2xl font-bold text-gray-800">{tramitesRealizados}</p>
          </div>
        </div>

        {/* Respuestas recibidas */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <InboxArrowDownIcon className="h-10 w-10 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Respuestas Recibidas</p>
            <p className="text-2xl font-bold text-gray-800">{respuestasRecibidas}</p>
          </div>
        </div>

        {/* Pendientes */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <ClockIcon className="h-10 w-10 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Trámites en Espera</p>
            <p className="text-2xl font-bold text-gray-800">{tramitesPendientes}</p>
          </div>
        </div>

        {/* Último acceso */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <ClockIcon className="h-10 w-10 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Último Acceso</p>
            <p className="text-xl font-bold text-gray-800">
              {ultimoAcceso}
            </p>
          </div>
        </div>

        {/* Acceso rápido */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <ArrowDownTrayIcon className="h-10 w-10 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Acceso rápido</p>
            <Link
              to="/dashboard/mis-documentos"
              className="text-blue-600 font-semibold hover:underline"
            >
              Mis Documentos
            </Link>
          </div>
        </div>

        {/* Mis entidades */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <BuildingOffice2Icon className="h-10 w-10 text-teal-600" />
          <div>
            <p className="text-sm text-gray-500">Mis Entidades</p>
            <p className="text-2xl font-bold text-gray-800">
              {entidadesVinculadas}
              <Link
                to="/dashboard/mis-entidades"
                className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Ver
              </Link>
            </p>
          </div>
        </div>

        {/* Mensajes */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <EnvelopeIcon className="h-10 w-10 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Mensajes</p>
            <p className="text-2xl font-bold text-gray-800">{mensajesTotal}</p>
            <p className="text-xs text-gray-500">
              {mensajesLeidos} leídos / {mensajesNoLeidos} no leídos
            </p>
          </div>
        </div>

        {/* Ir a Gmail */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-start gap-3">
          <EnvelopeIcon className="h-10 w-10 text-red-600" />
          <p className="text-sm text-gray-500">Bandeja de Entrada</p>
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Ir a Gmail
          </a>
        </div>

      </div>

      {/* Gráfica */}
      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-700">
              Actividad últimos 6 meses
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tramites" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
