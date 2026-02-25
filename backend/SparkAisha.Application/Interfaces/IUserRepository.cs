using SparkAisha.Domain.Entities;

namespace SparkAisha.Application.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
}
