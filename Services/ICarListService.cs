using EpokaRentals.DTOs;

namespace EpokaRentals.Services;

public interface ICarListService
{
    Task<List<CarDto>> GetCarsAsync(CarFilterDto filters);
}
