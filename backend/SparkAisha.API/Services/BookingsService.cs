using SparkAisha.API.DTOs;
using SparkAisha.API.Models;
using SparkAisha.API.Repositories;

namespace SparkAisha.API.Services;

public class BookingsService : IBookingsService
{
    private readonly IBookingRepository _repo;

    public BookingsService(IBookingRepository repo) => _repo = repo;

    public async Task<IEnumerable<BookingDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(ToDto);
    }

    public async Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId)
    {
        var items = await _repo.GetByUserIdAsync(userId);
        return items.Select(ToDto);
    }

    public async Task<BookingDto> CreateAsync(int userId, CreateBookingDto dto)
    {
        var entity = new Booking
        {
            UserId      = userId,
            ServiceId   = dto.ServiceId,
            BookingDate = dto.BookingDate,
            Status      = "Pending"
        };
        var created = await _repo.CreateAsync(entity);

        // Re-fetch with includes
        var full = await _repo.GetByIdAsync(created.Id);
        return ToDto(full!);
    }

    private static BookingDto ToDto(Booking b) => new()
    {
        Id          = b.Id,
        UserId      = b.UserId,
        ServiceId   = b.ServiceId,
        ServiceName = b.Service?.Title ?? string.Empty,
        BookingDate = b.BookingDate,
        Status      = b.Status
    };
}
