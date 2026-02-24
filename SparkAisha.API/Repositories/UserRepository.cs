using Microsoft.EntityFrameworkCore;
using SparkAisha.API.Data;
using SparkAisha.API.Models;

namespace SparkAisha.API.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context) { }

    public async Task<User?> GetByEmailAsync(string email)
        => await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email);
}
