using SparkAisha.API.DTOs;
using SparkAisha.API.Models;
using SparkAisha.API.Repositories;

namespace SparkAisha.API.Services;

public class ReviewsService : IReviewsService
{
    private readonly IReviewRepository _repo;

    public ReviewsService(IReviewRepository repo) => _repo = repo;

    public async Task<IEnumerable<ReviewDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(ToDto);
    }

    public async Task<IEnumerable<ReviewDto>> GetBySpaIdAsync(int spaId)
    {
        var items = await _repo.GetBySpaIdAsync(spaId);
        return items.Select(ToDto);
    }

    public async Task<ReviewDto> CreateAsync(int userId, CreateReviewDto dto)
    {
        var entity = new Review
        {
            UserId    = userId,
            SpaId     = dto.SpaId,
            Rating    = dto.Rating,
            Comment   = dto.Comment,
            CreatedAt = DateTime.UtcNow
        };
        var created = await _repo.CreateAsync(entity);
        return ToDto(created);
    }

    private static ReviewDto ToDto(Review r) => new()
    {
        Id        = r.Id,
        UserId    = r.UserId,
        UserName  = r.User?.FullName ?? string.Empty,
        SpaId     = r.SpaId,
        Rating    = r.Rating,
        Comment   = r.Comment,
        CreatedAt = r.CreatedAt
    };
}
