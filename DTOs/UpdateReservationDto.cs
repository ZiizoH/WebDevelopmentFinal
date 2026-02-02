namespace EpokaRentals.DTOs;

public class UpdateReservationDto
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public DateTime PickupDate { get; set; }
    public DateTime ReturnDate { get; set; }
}
