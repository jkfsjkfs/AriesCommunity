using Microsoft.AspNetCore.Mvc;
using AriesCommunityBackend.Models;
using System.Text.Json;
using AriesCommunityBackEnd.Models.DTO;
using AriesCommunityBackend.DTO;

namespace AriesCommunityBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitudesController : ControllerBase
    {
        private readonly string solicitudesPath;
        private readonly string respuestasPath;
        private readonly string archivosPath;

        public SolicitudesController(IWebHostEnvironment env)
        {
            var basePath = Path.Combine(env.ContentRootPath, "App_Data");
            solicitudesPath = Path.Combine(basePath, "solicitudes.json");
            respuestasPath = Path.Combine(basePath, "respuestas.json");
            archivosPath = Path.Combine(basePath, "archivos.json");
        }

        // Helpers
        private List<Solicitud> LoadSolicitudes() =>
            System.IO.File.Exists(solicitudesPath)
                ? JsonSerializer.Deserialize<List<Solicitud>>(System.IO.File.ReadAllText(solicitudesPath)) ?? new List<Solicitud>()
                : new List<Solicitud>();

        private void SaveSolicitudes(List<Solicitud> data) =>
            System.IO.File.WriteAllText(solicitudesPath, JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true }));

        private List<Respuesta> LoadRespuestas() =>
            System.IO.File.Exists(respuestasPath)
                ? JsonSerializer.Deserialize<List<Respuesta>>(System.IO.File.ReadAllText(respuestasPath)) ?? new List<Respuesta>()
                : new List<Respuesta>();

        private void SaveRespuestas(List<Respuesta> data) =>
            System.IO.File.WriteAllText(respuestasPath, JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true }));


        /// <summary>
        /// Registrar una nueva solicitud de trámite
        /// </summary>
        [HttpPost("agregar")]
        public IActionResult CrearSolicitud([FromBody] CrearSolicitudDto dto)
        {
            var solicitudes = LoadSolicitudes();
            var nueva = new Solicitud
            {
                Id = solicitudes.Any() ? solicitudes.Max(s => s.Id) + 1 : 1,
                Cod_nit = dto.Cod_nit,
                IdTramite = dto.IdTramite,
                CodMpio = dto.CodMpio,
                FechaHora = DateTime.Now
            };

            solicitudes.Add(nueva);
            SaveSolicitudes(solicitudes);

            return Ok(nueva);
        }

        /// <summary>
        /// Registrar una respuesta a una solicitud
        /// </summary>
        [HttpPost("{idSolicitud}/respuesta")]
        public IActionResult CrearRespuesta(int idSolicitud, [FromBody] CrearRespuestaDto dto)
        {
            var solicitudes = LoadSolicitudes();
            if (!solicitudes.Any(s => s.Id == idSolicitud))
                return NotFound(new { error = $"No existe la solicitud {idSolicitud}" });

            var respuestas = LoadRespuestas();

            foreach (var archivo in dto.Archivos)
            {
                if (!archivo.Nombre.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
                    return BadRequest(new { error = "Solo se permiten archivos PDF" });
            }

            var nueva = new Respuesta
            {
                Id = respuestas.Any() ? respuestas.Max(r => r.Id) + 1 : 1,
                IdSolicitud = idSolicitud,
                FechaHora = DateTime.Now,
                Mensaje = dto.Mensaje,
                Archivos = dto.Archivos,
                CodMpio = dto.CodMpio
            };

            respuestas.Add(nueva);
            SaveRespuestas(respuestas);

            return Ok(nueva);
        }

        /// <summary>
        /// Adjuntar un archivo PDF a una respuesta
        /// </summary>
        [HttpPost("respuesta/{idRespuesta}/archivo")]
        public IActionResult SubirArchivo(int idRespuesta, [FromBody] Archivo archivo)
        {
            if (!archivo.Nombre.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
                return BadRequest(new { error = "Solo se permiten archivos PDF" });

            var respuestas = LoadRespuestas();
            var respuesta = respuestas.FirstOrDefault(r => r.Id == idRespuesta);
            if (respuesta == null)
                return NotFound(new { error = $"No existe la respuesta {idRespuesta}" });

            
            if (respuesta.Archivos.Where(p => p.Nombre == archivo.Nombre).Any())
                return NotFound(new { error = $"El archivo ya existe ({archivo.Nombre}) para la respuesta {idRespuesta}" });

            respuesta.Archivos.Add(archivo);
            SaveRespuestas(respuestas);

            return Ok(new {respuesta});
        }



        /// <summary>
        /// Devuelve todas las solicitudes de un usuario con sus respuestas y archivos
        /// </summary>
        [HttpGet()]
        [HttpGet("{cod_nit}")]
        public IActionResult GetSolicitudes(string? cod_nit)
        {
            var solicitudes = cod_nit == null ? 
                LoadSolicitudes() 
                : LoadSolicitudes().Where(s => s.Cod_nit == cod_nit).ToList();
            var respuestas = LoadRespuestas();

            // Cargar catálogo de trámites para mostrar nombres
            var tramitesFile = Path.Combine(Directory.GetCurrentDirectory(), "App_Data", "tramites.json");
            var tramites = System.IO.File.Exists(tramitesFile)
                ? JsonSerializer.Deserialize<List<Tramite>>(System.IO.File.ReadAllText(tramitesFile)) ?? new List<Tramite>()
                : new List<Tramite>();

            var detalle = solicitudes.Select(s => new SolicitudDetalle
            {
                Id = s.Id,
                IdTramite = s.IdTramite,
                TramiteNombre = tramites.FirstOrDefault(t => t.Id == s.IdTramite)?.Nombre ?? "Desconocido",
                FechaHora = s.FechaHora,
                CodMpio = s.CodMpio,
                Respuestas = respuestas
                    .Where(r => r.IdSolicitud == s.Id)
                    .Select(r => new RespuestaDetalle
                    {
                        Id = r.Id,
                        FechaHora = r.FechaHora,
                        Mensaje = r.Mensaje,
                        Archivos = r.Archivos
                    }).ToList()
            }).ToList();

            return Ok(detalle);
        }



        /// <summary>
        /// Elimina una solicitud solo si no tiene respuestas asociadas
        /// </summary>
        [HttpDelete("{idSolicitud}")]
        public IActionResult EliminarSolicitud(int idSolicitud)
        {
            var solicitudes = LoadSolicitudes();
            var solicitud = solicitudes.FirstOrDefault(s => s.Id == idSolicitud);

            if (solicitud == null)
                return NotFound(new { error = $"No existe la solicitud {idSolicitud}" });

            var respuestas = LoadRespuestas();
            if (respuestas.Any(r => r.IdSolicitud == idSolicitud))
                return BadRequest(new { error = "No se puede eliminar la solicitud porque tiene respuestas asociadas" });

            solicitudes.Remove(solicitud);
            SaveSolicitudes(solicitudes);

            return Ok(new { eliminado = true, solicitud });
        }


        /// <summary>
        /// Elimina un archivo asociado a una respuesta
        /// </summary>
        [HttpDelete("respuesta/{idRespuesta}/archivo/{nombreArchivo}")]
        public IActionResult EliminarArchivo(int idRespuesta, string nombreArchivo)
        {
            var respuestas = LoadRespuestas();
            var respuesta = respuestas.FirstOrDefault(r => r.Id == idRespuesta);

            if (respuesta == null)
                return NotFound(new { error = $"No existe la respuesta {idRespuesta}" });

            var archivo = respuesta.Archivos.FirstOrDefault(a => a.Nombre == nombreArchivo);
            if (archivo == null)
                return NotFound(new { error = $"No existe el archivo {nombreArchivo} en la respuesta {idRespuesta}" });

            // Remover el archivo
            respuesta.Archivos.Remove(archivo);

            // Persistir cambios
            SaveRespuestas(respuestas);

            return Ok(new { eliminado = true, archivo });
        }



        /// <summary>
        /// Elimina una respuesta y todos sus archivos asociados
        /// </summary>
        [HttpDelete("respuesta/{idRespuesta}")]
        public IActionResult EliminarRespuesta(int idRespuesta)
        {
            var respuestas = LoadRespuestas();
            var respuesta = respuestas.FirstOrDefault(r => r.Id == idRespuesta);

            if (respuesta == null)
                return NotFound(new { error = $"No existe la respuesta {idRespuesta}" });

            // Eliminar archivos asociados

            // Eliminar la respuesta
            respuestas.Remove(respuesta);
            SaveRespuestas(respuestas);

            return Ok(new { eliminado = true, respuesta, archivosEliminados = respuesta.Archivos.Count });
        }

        /// <summary>
        /// Devuelve todas las respuestas asociadas a una solicitud
        /// </summary>
        [HttpGet("{idSolicitud}/respuestas")]
        public IActionResult GetRespuestasPorSolicitud(int idSolicitud)
        {
            var solicitudes = LoadSolicitudes();
            if (!solicitudes.Any(s => s.Id == idSolicitud))
                return NotFound(new { error = $"No existe la solicitud {idSolicitud}" });

            var respuestas = LoadRespuestas().Where(r => r.IdSolicitud == idSolicitud).ToList();

            var detalle = respuestas.Select(r => new
            {
                r.Id,
                r.IdSolicitud,
                r.FechaHora,
                r.Mensaje,
                r.Archivos 
            });

            return Ok(detalle);
        }


    }
}
