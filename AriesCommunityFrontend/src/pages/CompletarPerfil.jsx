import { useState } from "react";
import { CameraIcon, IdentificationIcon } from "@heroicons/react/24/outline";

export default function CompletarPerfil() {
  const [cedula, setCedula] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular guardado en localStorage
    const perfil = {
      cedula,
      foto: preview, // solo guardamos la URL de preview en mockup
    };
    localStorage.setItem("perfilExtra", JSON.stringify(perfil));

    alert("✅ Perfil completado. Redirigiendo al dashboard...");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Completar Registro
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cédula */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Número de Cédula
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-blue-50">
              <IdentificationIcon className="h-5 w-5 text-blue-500 mr-2" />
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ingrese su cédula"
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Foto de Perfil
            </label>
            <div className="flex flex-col items-center border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50 cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              ) : (
                <CameraIcon className="h-12 w-12 text-blue-400 mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFoto}
                className="text-xs text-gray-600"
              />
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Guardar y Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
