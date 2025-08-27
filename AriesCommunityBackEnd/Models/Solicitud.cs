
using System.Text.Json.Serialization;

namespace AriesCommunityBackend.Models
{
    public class Solicitud
    {
        
        public int Id { get; set; }
        public string Cod_nit { get; set; } = string.Empty;
        public int IdTramite { get; set; }
        public DateTime FechaHora { get; set; } = DateTime.Now;
        public string? CodMpio { get; set; } // null si aplica a todos
    }
}
