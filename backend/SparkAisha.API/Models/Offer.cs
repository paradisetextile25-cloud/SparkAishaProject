using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SparkAisha.API.Models;

public class Offer
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Column(TypeName = "decimal(10,2)")]
    public decimal OriginalPrice { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal DiscountPrice { get; set; }

    public DateTime ExpiryDate { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public int? ServiceId { get; set; }
    public Service? Service { get; set; }
}
