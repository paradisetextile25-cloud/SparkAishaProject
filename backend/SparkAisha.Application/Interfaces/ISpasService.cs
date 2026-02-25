using SparkAisha.Application.DTOs;

namespace SparkAisha.Application.Interfaces;

public interface ISpasService
{
    Task<IEnumerable<SpaDto>> GetAllAsync();
    Task<SpaDto?> GetByIdAsync(int id);
    Task<SpaDto> CreateAsync(CreateSpaDto dto);
}
