public class CarDto
{
    public int Id { get; set; }
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public decimal DailyPrice { get; set; }
    public bool IsAvailable { get; set; }

    public string ImageUrl { get; set; } = string.Empty; 

    public string? Category { get; set; }
    public string? Transmission { get; set; }
    public List<string> Locations { get; set; } = new();
}
