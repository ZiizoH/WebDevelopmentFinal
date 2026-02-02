namespace EpokaRentals.DTOs;

public class ReservationDto
{
    public int Id { get; set; }

    public int CarId { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string Email { get; set; }
    public string Phone { get; set; }

    public DateTime PickupDate { get; set; }
    public DateTime ReturnDate { get; set; }

    public decimal DailyPrice { get; set; }
    public decimal TotalPrice { get; set; }
}
