using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SparkAisha.API.DTOs;
using SparkAisha.API.Services;

namespace SparkAisha.API.Controllers;

[ApiController]
[Route("api/spas")]
public class SpasController : ControllerBase
{
    private readonly ISpasService _service;

    public SpasController(ISpasService service) => _service = service;

    /// <summary>Get all spas.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<SpaDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    /// <summary>Get a spa by ID.</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(SpaDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    /// <summary>Create a new spa listing. [Admin only]</summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(SpaDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateSpaDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}
