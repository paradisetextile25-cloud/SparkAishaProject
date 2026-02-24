using SparkAisha.API.DTOs;
using SparkAisha.API.Models;
using SparkAisha.API.Repositories;

namespace SparkAisha.API.Services;

public class OffersService : IOffersService
{
    private readonly IRepository<Offer> _repo;

    public OffersService(IRepository<Offer> repo) => _repo = repo;

    public async Task<IEnumerable<OfferDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(ToDto);
    }

    public async Task<OfferDto?> GetByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        return item is null ? null : ToDto(item);
    }

    public async Task<OfferDto> CreateAsync(CreateOfferDto dto)
    {
        var entity = new Offer
        {
            Title         = dto.Title,
            Description   = dto.Description,
            OriginalPrice = dto.OriginalPrice,
            DiscountPrice = dto.DiscountPrice,
            ExpiryDate    = dto.ExpiryDate,
            ImageUrl      = dto.ImageUrl,
            ServiceId     = dto.ServiceId
        };
        var created = await _repo.CreateAsync(entity);
        return ToDto(created);
    }

    private static OfferDto ToDto(Offer o) => new()
    {
        Id            = o.Id,
        Title         = o.Title,
        Description   = o.Description,
        OriginalPrice = o.OriginalPrice,
        DiscountPrice = o.DiscountPrice,
        ExpiryDate    = o.ExpiryDate,
        ImageUrl      = o.ImageUrl,
        ServiceId     = o.ServiceId
    };
}
