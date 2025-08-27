using Microsoft.AspNetCore.Mvc;
using AriesCommunityBackend.Models;
using System.Text.Json;

namespace AriesCommunityBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TramitesController : ControllerBase
    {
        private readonly string _filePath;

        public TramitesController(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "App_Data", "tramites.json");
        }

        private List<Tramite> LoadTramites()
        {
            if (!System.IO.File.Exists(_filePath)) return new List<Tramite>();
            var json = System.IO.File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Tramite>>(json) ?? new List<Tramite>();
        }

        private void SaveTramites(List<Tramite> tramites)
        {
            var json = JsonSerializer.Serialize(tramites, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_filePath, json);
        }

        /// <summary>
        /// Devuelve la lista de trámites disponibles
        /// </summary>
        [HttpGet]
        public IActionResult GetTramites()
        {
            var tramites = LoadTramites();
            return Ok(tramites);
        }

        /// <summary>
        /// Agrega un nuevo trámite al catálogo
        /// </summary>
        [HttpPost("agregar")]
        public IActionResult AddTramite([FromBody] Tramite nuevo)
        {
            if (string.IsNullOrEmpty(nuevo.Nombre))
                return BadRequest(new { error = "El nombre del trámite es requerido" });

            var tramites = LoadTramites();

            if(nuevo.Id == 0 || tramites.Any(p => p.Id == nuevo.Id))
                nuevo.Id = tramites.Any() ? tramites.Max(t => t.Id) + 1 : 1;
            
            tramites.Add(nuevo);
            SaveTramites(tramites);

            return CreatedAtAction(nameof(GetTramites), nuevo);
        }

        /// <summary>
        /// Elimina un trámite del catálogo por Id
        /// </summary>
        [HttpDelete("borrar/{id}")]
        public IActionResult DeleteTramite(int id)
        {
            var tramites = LoadTramites();
            var tramite = tramites.FirstOrDefault(t => t.Id == id);

            if (tramite == null)
                return NotFound(new { error = $"No se encontró el trámite con Id {id}" });

            tramites.Remove(tramite);
            SaveTramites(tramites);

            return Ok(new { eliminado = true, tramite });
        }
    }
}
