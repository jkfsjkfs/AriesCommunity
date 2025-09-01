import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Logo from "../assets/Logo.png"; // ajusta la ruta según tu estructura

export default function Login() {
  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    // Guardar sesión
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(decoded));

    // Redirigir al dashboard
    window.location.href = "/dashboard/mis-tramites";
  };

return (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="p-6 bg-white rounded-2xl shadow-md text-center">
      {/* Logo debajo del título */}
      <img
        src={Logo}
        alt="Logo Aries Community"
        className="mx-auto mb-6 w-32 h-32 object-contain"
      />

      {/* Login con Google */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Error en login")}
      />

      <br />

      {/* Título principal */}
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-red-700">COMUNID</span>
        <span className="text-blue-800">ARIES</span>
      </h1>

      {/* Subtítulo */}
      <h2 className="text-2xl font-semibold mb-2 text-blue-500">
        La red social de Aries
      </h2>

      {/* Slogan */}
      <h3 className="text-lg font-bold text-gray-600">
        ¡Conectando Territorios!
      </h3>
    </div>
  </div>
);


}
