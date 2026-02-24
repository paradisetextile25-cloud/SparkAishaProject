using SparkAisha.API.DTOs;

namespace SparkAisha.API.Services;

public interface IServicesService
{
    Task<IEnumerable<ServiceDto>> GetAllAsync();
    Task<ServiceDto?> GetByIdAsync(int id);
    Task<ServiceDto> CreateAsync(CreateServiceDto dto);
    Task<ServiceDto?> UpdateAsync(int id, CreateServiceDto dto);
    Task<bool> DeleteAsync(int id);
}
