using EpokaRentals.Data;
using EpokaRentals.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EpokaRentals.Services;

public class CarListService : ICarListService
{
    private readonly AppDbContext _context;

    public CarListService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CarDto>> GetCarsAsync(CarFilterDto filters)
    {
        var query = _context.Cars
            .Include(c => c.Category)
            .Include(c => c.Transmission)
            .Include(c => c.Locations)
            .AsQueryable();

        // 🧩 CATEGORY FILTER
        if (!string.IsNullOrEmpty(filters.Category))
        {
            query = query.Where(c =>
                c.Category != null &&
                c.Category.Name == filters.Category);
        }

        // 🧩 TRANSMISSION FILTER
        if (!string.IsNullOrEmpty(filters.Transmission))
        {
            query = query.Where(c =>
                c.Transmission != null &&
                c.Transmission.Code == filters.Transmission);
        }

        // 🧩 LOCATION FILTER
        if (!string.IsNullOrEmpty(filters.Location))
        {
            query = query.Where(c =>
                c.Locations.Any(l => l.Code == filters.Location));
        }

        // 🎯 Projection to DTO
        return await query.Select(c => new CarDto
        {
            Id = c.Id,
            Make = c.Make,
            Model = c.Model,
            Year = c.Year,
            DailyPrice = c.DailyPrice,
            IsAvailable = c.IsAvailable,
            ImageUrl = c.ImageUrl,
            Category = c.Category != null ? c.Category.Name : null,
            Transmission = c.Transmission != null ? c.Transmission.Name : null,
            Locations = c.Locations.Select(l => l.Name).ToList()
        }).ToListAsync();
    }
}
