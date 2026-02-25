using SparkAisha.API.DTOs;

namespace SparkAisha.API.Services;

public interface IBookingsService
{
    Task<IEnumerable<BookingDto>> GetAllAsync();
    Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId);
    Task<BookingDto> CreateAsync(int userId, CreateBookingDto dto);
}
