using System.Text.Json.Serialization;

namespace AriesCommunityBackend.Models
{
    public class Respuesta
    {
        public int Id { get; set; }
        public int IdSolicitud { get; set; }
        public string? CodMpio { get; set; }
        public DateTime FechaHora { get; set; } = DateTime.Now;
        public string Mensaje { get; set; } = string.Empty;
        public List<Archivo> Archivos { get; set; } = new(); // IDs de archivos asociados
    }
}
