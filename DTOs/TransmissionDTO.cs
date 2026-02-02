using System.ComponentModel.DataAnnotations;

namespace EpokaRentals.DTOs;

public class TransmissionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
}

public class CreateTransmissionDto
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string Code { get; set; } = string.Empty;
}
