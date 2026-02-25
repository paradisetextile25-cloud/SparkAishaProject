using Microsoft.EntityFrameworkCore;
using SparkAisha.API.Data;
using SparkAisha.API.Models;

namespace SparkAisha.API.Repositories;

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
