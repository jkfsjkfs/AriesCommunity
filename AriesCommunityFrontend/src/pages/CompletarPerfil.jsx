import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  CameraIcon,
  IdentificationIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";



export default function CompletarPerfil() {
  const [cedula, setCedula] = useState("");

  const [anversoFile, setAnversoFile] = useState(null);
  const [reversoFile, setReversoFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  const [anversoPreview, setAnversoPreview] = useState(null);
  const [reversoPreview, setReversoPreview] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);

  const [status, setStatus] = useState("pendiente");
  const [mensaje, setMensaje] = useState("Completa los campos y sube las fotos para continuar.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();


  const handleFile = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cedula || !anversoFile || !reversoFile || !selfieFile) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    setIsSubmitting(true);
    setStatus("procesando");
    setMensaje("Estamos validando tu identidad...");

    setTimeout(() => {
      setStatus("aprobada");
      setMensaje("Tu identidad fue verificada exitosamente.");
      setIsSubmitting(false);
    }, 2000);
  };

  const renderStatusBadge = () => {
    switch (status) {
      case "procesando":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
            Procesando
          </span>
        );
      case "aprobada":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            <CheckCircleIcon className="h-4 w-4" />
            Aprobada
          </span>
        );
      case "rechazada":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400">
            <XCircleIcon className="h-4 w-4" />
            Rechazada
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-300">
            <IdentificationIcon className="h-4 w-4" />
            Pendiente
          </span>
        );
    }
  };

  // ==========================
  // COMPONENTE UploadBox
  // ==========================

  const UploadBox = ({ title, preview, icon, onChange, onCapture, height }) => {
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
      setShowCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    const capturePhoto = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
        onCapture(file);

        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        setShowCamera(false);
      });
    };

    return (
      <>
        <div className="flex flex-col gap-2">
          <label
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-4 cursor-pointer hover:border-blue-400 hover:bg-slate-900 transition w-full ${height}`}
          >
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-contain rounded-lg border border-slate-800"
              />
            ) : (
              <>
                {icon}
                <span className="text-xs font-medium text-slate-200">{title}</span>
                <span className="text-[11px] text-slate-500 text-center">
                  Cargar archivo o tomar foto
                </span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={onChange} />
                      {/* Botón cámara DENTRO */}
          <button
            type="button"
            onClick={startCamera}
            className="text-xs w-full bg-blue-400 hover:bg-blue-500 text-white py-1.5 rounded-lg inline-flex items-center justify-center gap-2"
          >
            <CameraIcon className="h-4 w-4" />
            Tomar foto con cámara
          </button>
          </label>
        </div>

        {/* Modal cámara */}
        {showCamera && (
          <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center p-4 z-50">
            <video ref={videoRef} className="w-full max-w-md rounded-xl" />

            <button
              onClick={capturePhoto}
              className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium"
            >
              Capturar foto
            </button>

            <button
              onClick={() => setShowCamera(false)}
              className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-white text-sm"
            >
              Cancelar
            </button>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </>
    );
  };

  // ================================
  // UI — DISEÑO FINAL
  // ================================

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full grid gap-6 md:grid-cols-2">

        {/* COLUMNA IZQUIERDA */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <IdentificationIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-white">Verificación de identidad</h1>
              <p className="text-sm text-slate-400">
                Sube las fotos del documento y tu selfie.
              </p>
            </div>
          </div>

          {/* Cédula */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Número de cédula
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={15}
              value={cedula}
              onChange={(e) => setCedula(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ej: 1012345678"
            />
          </div>

          {/* Anverso + Reverso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadBox
              title="Anverso"
              preview={anversoPreview}
              height="h-70"
              icon={<DocumentDuplicateIcon className="h-8 w-8 text-slate-400" />}
              onChange={(e) => handleFile(e, setAnversoFile, setAnversoPreview)}
              onCapture={(file) =>
                handleFile({ target: { files: [file] }}, setAnversoFile, setAnversoPreview)
              }
            />

            <UploadBox
              title="Reverso"
              preview={reversoPreview}
              height="h-70"
              icon={<DocumentDuplicateIcon className="h-8 w-8 text-slate-400" />}
              onChange={(e) => handleFile(e, setReversoFile, setReversoPreview)}
              onCapture={(file) =>
                handleFile({ target: { files: [file] }}, setReversoFile, setReversoPreview)
              }
            />
          </div>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6">

          {/* Selfie más alta */}
          <UploadBox
            title="Selfie"
            preview={selfiePreview}
            height="h-120"
            icon={<CameraIcon className="h-8 w-8 text-slate-400" />}
            onChange={(e) => handleFile(e, setSelfieFile, setSelfiePreview)}
            onCapture={(file) =>
              handleFile({ target: { files: [file] }}, setSelfieFile, setSelfiePreview)
            }
          />

          {/* Estado */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">Estado</h2>
              {renderStatusBadge()}
            </div>

            <p className="text-sm text-slate-300 mt-2">{mensaje}</p>
          </div>

          {/* Verificar identidad */}
{/* Botones de acción */}
<div className="w-full">


  {/* Botón Verificar (solo cuando NO está aprobada) */}
  {status !== "aprobada" && (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold text-sm disabled:opacity-70"
    >
      {isSubmitting && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
      {isSubmitting ? "Verificando..." : "Verificar identidad"}
    </button>
  )}

  {/* Botón Continuar (solo cuando está aprobado) */}
  {status === "aprobada" && (
    <button
      onClick={() => navigate("/dashboard")}
      className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 font-semibold text-sm"
    >
      Continuar
    </button>
  )}

</div>


        </div>
      </div>
    </div>
  );
}
