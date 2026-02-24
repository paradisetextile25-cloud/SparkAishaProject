using System.ComponentModel.DataAnnotations;

namespace SparkAisha.API.DTOs;

public class SpaDto
{
    public int    Id          { get; set; }
    public string Name        { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location    { get; set; } = string.Empty;
    public double Rating      { get; set; }
    public string ImageUrl    { get; set; } = string.Empty;
    public string PriceRange  { get; set; } = string.Empty;
}

public class CreateSpaDto
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Location { get; set; } = string.Empty;

    [Range(0, 5)]
    public double Rating { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    [MaxLength(20)]
    public string PriceRange { get; set; } = string.Empty;
}
