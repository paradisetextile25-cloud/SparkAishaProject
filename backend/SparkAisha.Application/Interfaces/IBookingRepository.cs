using SparkAisha.Domain.Entities;

namespace SparkAisha.Application.Interfaces;

public interface IBookingRepository : IRepository<Booking>
{
    Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);
}
