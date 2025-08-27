using AriesCommunityBackend.Models;

namespace AriesCommunityBackEnd.Models.DTO
{
    public class SolicitudDetalle
    {
        public int Id { get; set; }
        public int IdTramite { get; set; }
        public string TramiteNombre { get; set; } = string.Empty;
        public DateTime FechaHora { get; set; }
        public string? CodMpio { get; set; }
        public List<RespuestaDetalle> Respuestas { get; set; } = new();
    }

    public class RespuestaDetalle
    {
        public int Id { get; set; }
        public DateTime FechaHora { get; set; }
        public string Mensaje { get; set; } = string.Empty;
        public List<Archivo> Archivos { get; set; } = new();
    }
}
