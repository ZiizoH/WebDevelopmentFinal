using System.ComponentModel.DataAnnotations;

namespace EpokaRentals.Models;

public class Transmission
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty; // Automatic, Manual

    [MaxLength(10)]
    public string Code { get; set; } = string.Empty; // A, M
}
