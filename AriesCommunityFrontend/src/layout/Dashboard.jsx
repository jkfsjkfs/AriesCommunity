import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/Logo_Blanco.png";
import MockUpDashboard from "../pages/MockUpDashboard";


export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Inicio",
      path: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Mis Trámites",
      path: "/dashboard/mis-tramites",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Solicitar Trámite",
      path: "/dashboard/solicitar-tramite",
      icon: PencilSquareIcon,
    },
    {
      name: "Mensajes",
      path: "/dashboard/mensajes",
      icon: ChatBubbleOvalLeftEllipsisIcon,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col shadow-lg">
        <div className="flex items-center gap-3 px-6 py-4 mt-3 mb-3 text-xl font-bold border-b border-blue-900">
          <img
            src={Logo}
            alt="Logo Aries Community"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h2 className="text-gray-200 font-bold leading-tight">
              COMUNIDARIES
            </h2>
            <h5 className="text-xs text-gray-500">Sistemas Aries</h5>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "bg-blue-700 text-white"
                        : "text-gray-200 hover:bg-blue-800"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h1 className="font-semibold text-gray-800">
            <span className="text-xl font-bold">Aries Community</span> - Panel
            de Usuario
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {user && (
              <div className="flex items-center gap-3">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </header>



        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {location.pathname === "/dashboard" ? (
            // 👇 mockup de estadísticas
            <MockUpDashboard />          
            ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
