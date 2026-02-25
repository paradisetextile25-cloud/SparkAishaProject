using SparkAisha.Application.DTOs;

namespace SparkAisha.Application.Interfaces;

public interface IBookingsService
{
    Task<IEnumerable<BookingDto>> GetAllAsync();
    Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId);
    Task<BookingDto> CreateAsync(int userId, CreateBookingDto dto);
}
