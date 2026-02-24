using SparkAisha.API.Models;

namespace SparkAisha.API.Repositories;

public interface IBookingRepository : IRepository<Booking>
{
    Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);
}
