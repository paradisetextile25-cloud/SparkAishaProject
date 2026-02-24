using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SparkAisha.API.DTOs;
using SparkAisha.API.Services;

namespace SparkAisha.API.Controllers;

[ApiController]
[Route("api/bookings")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly IBookingsService _service;

    public BookingsController(IBookingsService service) => _service = service;

    /// <summary>Create a booking for the authenticated user.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(BookingDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var created = await _service.CreateAsync(userId.Value, dto);
        return CreatedAtAction(nameof(Create), new { id = created.Id }, created);
    }

    /// <summary>Get all bookings for the authenticated user.</summary>
    [HttpGet("my")]
    [ProducesResponseType(typeof(IEnumerable<BookingDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMine()
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var items = await _service.GetByUserIdAsync(userId.Value);
        return Ok(items);
    }

    /// <summary>Get all bookings. [Admin only]</summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(IEnumerable<BookingDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    private int? GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(claim, out var id) ? id : null;
    }
}
