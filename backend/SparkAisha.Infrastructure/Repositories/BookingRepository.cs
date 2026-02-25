using SparkAisha.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using SparkAisha.Infrastructure.Data;
using SparkAisha.Domain.Entities;

namespace SparkAisha.Infrastructure.Repositories;

public class BookingRepository : Repository<Booking>, IBookingRepository
{
    public BookingRepository(AppDbContext context) : base(context) { }

    public override async Task<IEnumerable<Booking>> GetAllAsync()
        => await _context.Bookings
            .Include(b => b.Service)
            .Include(b => b.User)
            .ToListAsync();

    public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId)
        => await _context.Bookings
            .Include(b => b.Service)
            .Where(b => b.UserId == userId)
            .ToListAsync();
}
