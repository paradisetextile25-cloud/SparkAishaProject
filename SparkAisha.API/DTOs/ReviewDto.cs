using System.ComponentModel.DataAnnotations;

namespace SparkAisha.API.DTOs;

public class ReviewDto
{
    public int    Id        { get; set; }
    public int    UserId    { get; set; }
    public string UserName  { get; set; } = string.Empty;
    public int    SpaId     { get; set; }
    public int    Rating    { get; set; }
    public string Comment   { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateReviewDto
{
    [Required]
    public int SpaId { get; set; }

    [Required, Range(1, 5)]
    public int Rating { get; set; }

    [MaxLength(1000)]
    public string Comment { get; set; } = string.Empty;
}
