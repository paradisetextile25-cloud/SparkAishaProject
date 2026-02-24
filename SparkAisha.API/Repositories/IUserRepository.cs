using SparkAisha.API.Models;

namespace SparkAisha.API.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
}
