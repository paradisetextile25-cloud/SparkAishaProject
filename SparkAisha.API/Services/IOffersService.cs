using SparkAisha.API.DTOs;

namespace SparkAisha.API.Services;

public interface IOffersService
{
    Task<IEnumerable<OfferDto>> GetAllAsync();
    Task<OfferDto?> GetByIdAsync(int id);
    Task<OfferDto> CreateAsync(CreateOfferDto dto);
}
