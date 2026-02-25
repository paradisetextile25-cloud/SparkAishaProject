using System.ComponentModel.DataAnnotations;

namespace SparkAisha.Application.DTOs;

public class OfferDto
{
    public int      Id            { get; set; }
    public string   Title         { get; set; } = string.Empty;
    public string   Description   { get; set; } = string.Empty;
    public decimal  OriginalPrice { get; set; }
    public decimal  DiscountPrice { get; set; }
    public DateTime ExpiryDate    { get; set; }
    public string   ImageUrl      { get; set; } = string.Empty;
    public int?     ServiceId     { get; set; }
}

public class CreateOfferDto
{
    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Range(0, 100000)]
    public decimal OriginalPrice { get; set; }

    [Range(0, 100000)]
    public decimal DiscountPrice { get; set; }

    public DateTime ExpiryDate { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public int? ServiceId { get; set; }
}
