using System.ComponentModel.DataAnnotations;

namespace SparkAisha.Domain.Entities;

public class Spa
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Location { get; set; } = string.Empty;

    public double Rating { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    [MaxLength(20)]
    public string PriceRange { get; set; } = string.Empty;

    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
