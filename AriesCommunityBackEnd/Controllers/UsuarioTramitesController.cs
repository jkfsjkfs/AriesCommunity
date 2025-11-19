using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/[controller]")]
public class UsuarioTramitesController : ControllerBase
{
    private readonly string _filePath;

    public UsuarioTramitesController(IWebHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "App_Data", "usuario_tramites.json");
    }

    private List<dynamic> Load()
    {
        if (!System.IO.File.Exists(_filePath)) return new List<dynamic>();
        var json = System.IO.File.ReadAllText(_filePath);
        return JsonConvert.DeserializeObject<List<dynamic>>(json) ?? new List<dynamic>();
    }

    private void Save(List<dynamic> data)
    {
        var json = JsonConvert.SerializeObject(data, Formatting.Indented);
        System.IO.File.WriteAllText(_filePath, json);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(Load());
    }

    [HttpGet("{cod_nit}")]
    public IActionResult GetByUser(string cod_nit)
    {
        var data = Load();
        var lista = data.Where(t => (string)t.cod_nit == cod_nit).ToList();
        return Ok(lista);
    }

    [HttpPost("agregar")]
    public IActionResult Add([FromBody] dynamic tramite)
    {
        var data = Load();
        data.Add(tramite);
        Save(data);
        return Ok(new { ok = true });
    }
}
