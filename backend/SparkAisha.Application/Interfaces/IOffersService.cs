using SparkAisha.Application.DTOs;

namespace SparkAisha.Application.Interfaces;

public interface IOffersService
{
    Task<IEnumerable<OfferDto>> GetAllAsync();
    Task<OfferDto?> GetByIdAsync(int id);
    Task<OfferDto> CreateAsync(CreateOfferDto dto);
}
