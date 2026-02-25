using SparkAisha.API.Models;

namespace SparkAisha.API.Repositories;

public interface IReviewRepository : IRepository<Review>
{
    Task<IEnumerable<Review>> GetBySpaIdAsync(int spaId);
}
