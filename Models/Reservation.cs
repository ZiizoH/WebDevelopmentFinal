using System.ComponentModel.DataAnnotations;

namespace EpokaRentals.Models;

public class Reservation
{
    public int Id { get; set; }

    [Required]
    public int CarId { get; set; }
    public Car Car { get; set; }

    // Driver info
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Phone { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public string DriversLicenseNumber { get; set; }

    [Required]
    public string LicenseIssuingCountry { get; set; }

    [Required]
    public DateTime LicenseExpiryDate { get; set; }

    // Rental info
    [Required]
    public DateTime PickupDate { get; set; }

    [Required]
    public DateTime ReturnDate { get; set; }

    public decimal DailyPrice { get; set; }
    public decimal TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
