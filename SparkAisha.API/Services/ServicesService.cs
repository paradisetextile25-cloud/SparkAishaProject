using SparkAisha.API.DTOs;
using SparkAisha.API.Models;
using SparkAisha.API.Repositories;

namespace SparkAisha.API.Services;

public class ServicesService : IServicesService
{
    private readonly IRepository<Service> _repo;

    public ServicesService(IRepository<Service> repo) => _repo = repo;

    public async Task<IEnumerable<ServiceDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(ToDto);
    }

    public async Task<ServiceDto?> GetByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        return item is null ? null : ToDto(item);
    }

    public async Task<ServiceDto> CreateAsync(CreateServiceDto dto)
    {
        var entity = new Service
        {
            Title       = dto.Title,
            Description = dto.Description,
            Price       = dto.Price,
            Duration    = dto.Duration,
            ImageUrl    = dto.ImageUrl,
            IsFeatured  = dto.IsFeatured
        };
        var created = await _repo.CreateAsync(entity);
        return ToDto(created);
    }

    public async Task<ServiceDto?> UpdateAsync(int id, CreateServiceDto dto)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity is null) return null;

        entity.Title       = dto.Title;
        entity.Description = dto.Description;
        entity.Price       = dto.Price;
        entity.Duration    = dto.Duration;
        entity.ImageUrl    = dto.ImageUrl;
        entity.IsFeatured  = dto.IsFeatured;

        var updated = await _repo.UpdateAsync(entity);
        return ToDto(updated);
    }

    public async Task<bool> DeleteAsync(int id) => await _repo.DeleteAsync(id);

    private static ServiceDto ToDto(Service s) => new()
    {
        Id          = s.Id,
        Title       = s.Title,
        Description = s.Description,
        Price       = s.Price,
        Duration    = s.Duration,
        ImageUrl    = s.ImageUrl,
        IsFeatured  = s.IsFeatured
    };
}
