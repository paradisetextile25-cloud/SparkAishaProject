using SparkAisha.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using SparkAisha.Infrastructure.Data;
using SparkAisha.Domain.Entities;

namespace SparkAisha.Infrastructure.Repositories;

public class ReviewRepository : Repository<Review>, IReviewRepository
{
    public ReviewRepository(AppDbContext context) : base(context) { }

    public override async Task<IEnumerable<Review>> GetAllAsync()
        => await _context.Reviews
            .Include(r => r.User)
            .Include(r => r.Spa)
            .ToListAsync();

    public async Task<IEnumerable<Review>> GetBySpaIdAsync(int spaId)
        => await _context.Reviews
            .Include(r => r.User)
            .Where(r => r.SpaId == spaId)
            .ToListAsync();
}
