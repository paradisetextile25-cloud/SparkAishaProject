using SparkAisha.Application.DTOs;

namespace SparkAisha.Application.Interfaces;

public interface IReviewsService
{
    Task<IEnumerable<ReviewDto>> GetAllAsync();
    Task<IEnumerable<ReviewDto>> GetBySpaIdAsync(int spaId);
    Task<ReviewDto> CreateAsync(int userId, CreateReviewDto dto);
}
