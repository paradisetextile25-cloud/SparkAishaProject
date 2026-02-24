using System.ComponentModel.DataAnnotations;

namespace SparkAisha.API.DTOs;

public class BookingDto
{
    public int      Id          { get; set; }
    public int      UserId      { get; set; }
    public int      ServiceId   { get; set; }
    public string   ServiceName { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public string   Status      { get; set; } = string.Empty;
}

public class CreateBookingDto
{
    [Required]
    public int ServiceId { get; set; }

    [Required]
    public DateTime BookingDate { get; set; }
}
