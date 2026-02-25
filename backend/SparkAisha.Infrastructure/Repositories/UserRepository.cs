using SparkAisha.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using SparkAisha.Infrastructure.Data;
using SparkAisha.Domain.Entities;

namespace SparkAisha.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context) { }

    public async Task<User?> GetByEmailAsync(string email)
        => await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email);
}
