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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Marzo", tramites: 4 },
  { name: "Abril", tramites: 6 },
  { name: "Mayo", tramites: 3 },
  { name: "Junio", tramites: 5 },
  { name: "Julio", tramites: 7 },
  { name: "Agosto", tramites: 7 },
];

export default function MockUpDashboard() {
  return (
    <div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Trámites realizados */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <DocumentCheckIcon className="h-10 w-10 text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Trámites Realizados</p>
          <p className="text-2xl font-bold text-gray-800">328</p>
        </div>
      </div>

      {/* Respuestas recibidas */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <InboxArrowDownIcon className="h-10 w-10 text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Respuestas Recibidas</p>
          <p className="text-2xl font-bold text-gray-800">152</p>
        </div>
      </div>


      {/* Trámites en espera */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <ClockIcon className="h-10 w-10 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-500">Trámites en Espera</p>
          <p className="text-2xl font-bold text-gray-800">18</p>
        </div>
      </div>

    {/* Último acceso */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <ClockIcon className="h-10 w-10 text-gray-600" />
        <div>
          <p className="text-sm text-gray-500">Último Acceso</p>
          <p className="text-xl font-bold text-gray-800">
            27/08/2025 - 10:45 AM
          </p>
        </div>
      </div>

     


       {/* Acceso a Mis Documentos */}
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


      {/* Mis Entidades */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <BuildingOffice2Icon className="h-10 w-10 text-teal-600" />
        <div>
          <p className="text-sm text-gray-500">Mis Entidades</p>
          <p className="text-2xl font-bold text-gray-800">12
          <a href="/dashboard/mis-entidades"
                target="_blank"
                rel="noopener noreferrer"
            className="ml-5 px-3 py-1 bg-green-500 text-white rounded hover:bg-gren-600 text-sm"
        > Ver</a></p>
        </div>
      </div>

      {/* Mensajes recibidos vs no leídos */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <EnvelopeIcon className="h-10 w-10 text-purple-600" />
        <div>
          <p className="text-sm text-gray-500">Mensajes</p>
          <p className="text-2xl font-bold text-gray-800">87</p>
          <p className="text-xs text-gray-500">65 leídos / 22 no leídos</p>
        </div>
      </div>

      {/* Botón hacia Gmail */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col items-start gap-2">
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
    <div className="grid grid-cols-1 gap-4 mt-6">
      {/* Gráfica de movimientos */}
      <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-2 mb-4">
          <ChartBarIcon className="h-6 w-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-700">
             Ultimos 6 meses
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
