using Microsoft.AspNetCore.Mvc;
using AriesCommunityBackend.Models;
using System.Text.Json;
using Google.Apis.Auth;

namespace AriesCommunityBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly string _filePath;
        private readonly IConfiguration _config;

        public AuthController(IWebHostEnvironment env, IConfiguration config)
        {
            _filePath = Path.Combine(env.ContentRootPath, "App_Data", "usuarios.json");
            _config = config;
        }

        private List<Usuario> LoadUsuarios()
        {
            if (!System.IO.File.Exists(_filePath)) return new List<Usuario>();
            var json = System.IO.File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Usuario>>(json) ?? new List<Usuario>();
        }

        private void SaveUsuarios(List<Usuario> usuarios)
        {
            var json = JsonSerializer.Serialize(usuarios, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_filePath, json);
        }

        /// <summary>
        /// Valida el token de Google y retorna el usuario si está registrado
        /// </summary>
        [HttpPost("google")]
        public async Task<IActionResult> LoginGoogle([FromBody] dynamic data)
        {
            string idToken = data?.id_token;
            if (string.IsNullOrEmpty(idToken))
                return BadRequest(new { error = "Se requiere id_token" });

            try
            {
                GoogleJsonWebSignature.Payload payload;

                if (_config.GetValue<string>("ASPNETCORE_ENVIRONMENT") == "Development")
                {
                    // En desarrollo: validar sin ClientId
                    payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
                }
                else
                {
                    // En producción: validar SOLO si el token corresponde a tu app
                    var settings = new GoogleJsonWebSignature.ValidationSettings()
                    {
                        Audience = new[] { _config["GoogleAuth:ClientId"] }
                    };
                    payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
                }

                string email = payload.Email;
                string nombre = payload.Name ?? payload.Email;

                var usuarios = LoadUsuarios();
                var usuario = usuarios.FirstOrDefault(u => u.Email == email);

                if (usuario != null)
                {
                    return Ok(new { registrado = true, usuario });
                }

                return Ok(new { registrado = false, email, nombre });
            }
            catch (InvalidJwtException ex)
            {
                return Unauthorized(new { error = "Token inválido", detalle = ex.Message });
            }
        }


        /// <summary>
        /// Registra un nuevo usuario en usuarios.json
        /// </summary>
        [HttpPost("register")]
        public IActionResult Register([FromBody] Usuario nuevo)
        {
            if (string.IsNullOrEmpty(nuevo.Email) || string.IsNullOrEmpty(nuevo.Cod_nit))
                return BadRequest(new { error = "Email y Cod_nit son requeridos" });

            var usuarios = LoadUsuarios();

            if (usuarios.Any(u => u.Email == nuevo.Email))
                return Conflict(new { error = "El usuario ya está registrado" });

            usuarios.Add(nuevo);
            SaveUsuarios(usuarios);

            return Ok(new { registrado = true, usuario = nuevo });
        }

        /// <summary>
        /// Lista todos los usuarios registrados en usuarios.json
        /// </summary>
        [HttpGet("usuarios")]
        public IActionResult GetUsuarios()
        {
            var usuarios = LoadUsuarios();
            return Ok(usuarios);
        }

        /// <summary>
        /// Obtiene un usuario por su email
        /// </summary>
        [HttpGet("usuarios/{email}")]
        public IActionResult GetUsuarioByEmail(string email)
        {
            var usuarios = LoadUsuarios();
            var usuario = usuarios.FirstOrDefault(u =>
                u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));

            if (usuario == null)
                return NotFound(new { error = $"No se encontró el usuario con email {email}" });

            return Ok(usuario);
        }



    }
}
