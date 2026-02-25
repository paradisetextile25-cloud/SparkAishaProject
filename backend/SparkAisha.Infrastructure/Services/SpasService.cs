using SparkAisha.Application.Interfaces;
using SparkAisha.Application.DTOs;
using SparkAisha.Domain.Entities;
using SparkAisha.Infrastructure.Repositories;

namespace SparkAisha.Infrastructure.Services;

public class SpasService : ISpasService
{
    private readonly IRepository<Spa> _repo;

    public SpasService(IRepository<Spa> repo) => _repo = repo;

    public async Task<IEnumerable<SpaDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(ToDto);
    }

    public async Task<SpaDto?> GetByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        return item is null ? null : ToDto(item);
    }

    public async Task<SpaDto> CreateAsync(CreateSpaDto dto)
    {
        var entity = new Spa
        {
            Name        = dto.Name,
            Description = dto.Description,
            Location    = dto.Location,
            Rating      = dto.Rating,
            ImageUrl    = dto.ImageUrl,
            PriceRange  = dto.PriceRange
        };
        var created = await _repo.CreateAsync(entity);
        return ToDto(created);
    }

    private static SpaDto ToDto(Spa s) => new()
    {
        Id          = s.Id,
        Name        = s.Name,
        Description = s.Description,
        Location    = s.Location,
        Rating      = s.Rating,
        ImageUrl    = s.ImageUrl,
        PriceRange  = s.PriceRange
    };
}
