using AriesCommunityBackend.Models;

namespace AriesCommunityBackend.DTO
{
    public class CrearRespuestaDto
    {
        public string Mensaje { get; set; } = string.Empty;
        public List<Archivo> Archivos { get; set; } = new(); // IDs de archivos asociados
        public string? CodMpio { get; set; }
    }
}
