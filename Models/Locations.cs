namespace EpokaRentals.Models;

public class Location
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;

    public ICollection<Car> Cars { get; set; } = new List<Car>();
}
