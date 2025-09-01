import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Logo from "../assets/Logo.png"; // ajusta la ruta según tu estructura

export default function Login() {
  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    // Guardar sesión básica
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(decoded));

    
    //window.location.href = "/dashboard";
    window.location.href = "/dashboard/completar-perfil";

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-md text-center">
        {/* Logo debajo del título */}
        <img
          src={Logo}
          alt="Logo Aries Community"
          className="mx-auto mb-5 w-64 h-64 object-contain"
        />

        {/* Login con Google */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Error en login")}
        />

        {/* Subtítulo */}
        <h3 className="text-sm font-semibold mt-3 mb-2 text-blue-700">
          La red social de Aries
        </h3>
      </div>
    </div>
  );
}
