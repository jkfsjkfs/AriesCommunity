namespace AriesCommunityBackend.DTO
{
    public class CrearSolicitudDto
    {
        public string Cod_nit { get; set; } = string.Empty;
        public int IdTramite { get; set; }
        public string? CodMpio { get; set; }

    }
}
