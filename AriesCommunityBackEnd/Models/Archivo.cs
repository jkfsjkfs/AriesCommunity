using System.Text.Json.Serialization;

namespace AriesCommunityBackend.Models
{
    public class Archivo
    {
        public string Nombre { get; set; } = string.Empty;
        public string ContenidoBase64 { get; set; } = string.Empty; // Solo PDF
    }
}
