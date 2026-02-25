using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SparkAisha.Application.DTOs;
using SparkAisha.Application.Interfaces;

namespace SparkAisha.API.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewsController : ControllerBase
{
    private readonly IReviewsService _service;

    public ReviewsController(IReviewsService service) => _service = service;

    /// <summary>Get all reviews.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ReviewDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    /// <summary>Get all reviews for a specific spa.</summary>
    [HttpGet("spa/{spaId:int}")]
    [ProducesResponseType(typeof(IEnumerable<ReviewDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetBySpa(int spaId)
        => Ok(await _service.GetBySpaIdAsync(spaId));

    /// <summary>Submit a review. [Authenticated users only]</summary>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(ReviewDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateReviewDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(claim, out var userId)) return Unauthorized();

        var created = await _service.CreateAsync(userId, dto);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }
}
