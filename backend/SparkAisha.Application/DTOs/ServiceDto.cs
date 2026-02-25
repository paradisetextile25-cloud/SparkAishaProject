using System.ComponentModel.DataAnnotations;

namespace SparkAisha.Application.DTOs;

public class ServiceDto
{
    public int    Id          { get; set; }
    public string Title       { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price      { get; set; }
    public string Duration    { get; set; } = string.Empty;
    public string ImageUrl    { get; set; } = string.Empty;
    public bool   IsFeatured  { get; set; }
}

public class CreateServiceDto
{
    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Range(0, 100000)]
    public decimal Price { get; set; }

    [MaxLength(50)]
    public string Duration { get; set; } = string.Empty;

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsFeatured { get; set; } = false;
}
