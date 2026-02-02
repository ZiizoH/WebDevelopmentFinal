using System.ComponentModel.DataAnnotations;

namespace EpokaRentals.DTOs;

public class CreateReservationDTO
{
    [Required]
    public int CarId { get; set; }

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

    [Required]
    public DateTime PickupDate { get; set; }

    [Required]
    public DateTime ReturnDate { get; set; }
}
