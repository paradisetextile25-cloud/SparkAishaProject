using SparkAisha.API.DTOs;

namespace SparkAisha.API.Services;

public interface IReviewsService
{
    Task<IEnumerable<ReviewDto>> GetAllAsync();
    Task<IEnumerable<ReviewDto>> GetBySpaIdAsync(int spaId);
    Task<ReviewDto> CreateAsync(int userId, CreateReviewDto dto);
}
