using Microsoft.EntityFrameworkCore;
using SparkAisha.API.Models;

namespace SparkAisha.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User>    Users    { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Spa>     Spas     { get; set; }
    public DbSet<Offer>   Offers   { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Review>  Reviews  { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique email constraint
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Booking → User (restrict delete to avoid cascade conflicts)
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany(u => u.Bookings)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Booking → Service
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Service)
            .WithMany(s => s.Bookings)
            .HasForeignKey(b => b.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        // Review → User
        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Review → Spa
        modelBuilder.Entity<Review>()
            .HasOne(r => r.Spa)
            .WithMany(s => s.Reviews)
            .HasForeignKey(r => r.SpaId)
            .OnDelete(DeleteBehavior.Cascade);

        // Offer → Service (optional FK)
        modelBuilder.Entity<Offer>()
            .HasOne(o => o.Service)
            .WithMany(s => s.Offers)
            .HasForeignKey(o => o.ServiceId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
