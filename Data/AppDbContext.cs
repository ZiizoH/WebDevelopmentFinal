using Microsoft.EntityFrameworkCore;
using EpokaRentals.Models;

namespace EpokaRentals.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Location> Locations => Set<Location>();
    public DbSet<Car> Cars => Set<Car>();
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Transmission> Transmissions { get; set; } = null!;
    
    public DbSet<Reservation> Reservations { get; set; }


}
