using System.ComponentModel.DataAnnotations;

namespace EpokaRentals.Models;

public class Car
{
    public int Id { get; set; }

    // ───── Basic car info ─────
    [Required]
    public string Make { get; set; } = string.Empty;

    [Required]
    public string Model { get; set; } = string.Empty;

    public int Year { get; set; }

    // ───── Rental-specific ─────
    [Required]
    public string PlateNumber { get; set; } = string.Empty;

    public decimal DailyPrice { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public bool IsAvailable { get; set; } = true;

    // ───── Category (ACRISS-based) ─────
    public int? CategoryId { get; set; }
    public Category? Category { get; set; }

    // ───── Transmission ─────
    public int? TransmissionId { get; set; }
    public Transmission? Transmission { get; set; }

    // ───── Locations (many-to-many) ─────
    public ICollection<Location> Locations { get; set; } = new List<Location>();
}
