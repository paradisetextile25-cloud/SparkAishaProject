using System.ComponentModel.DataAnnotations;

namespace SparkAisha.Domain.Entities;

public class Booking
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;

    public DateTime BookingDate { get; set; }

    [MaxLength(50)]
    public string Status { get; set; } = "Pending";
}
