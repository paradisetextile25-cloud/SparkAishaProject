using SparkAisha.API.DTOs;

namespace SparkAisha.API.Services;

public interface ISpasService
{
    Task<IEnumerable<SpaDto>> GetAllAsync();
    Task<SpaDto?> GetByIdAsync(int id);
    Task<SpaDto> CreateAsync(CreateSpaDto dto);
}
