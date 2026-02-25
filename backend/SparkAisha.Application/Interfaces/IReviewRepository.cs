using SparkAisha.Domain.Entities;

namespace SparkAisha.Application.Interfaces;

public interface IReviewRepository : IRepository<Review>
{
    Task<IEnumerable<Review>> GetBySpaIdAsync(int spaId);
}
