using Microsoft.Extensions.Configuration;
using SparkAisha.Application.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SparkAisha.Application.DTOs.Auth;
using SparkAisha.Domain.Entities;
using SparkAisha.Infrastructure.Repositories;

namespace SparkAisha.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepo;
    private readonly IConfiguration  _config;

    public AuthService(IUserRepository userRepo, IConfiguration config)
    {
        _userRepo = userRepo;
        _config   = config;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existing = await _userRepo.GetByEmailAsync(dto.Email);
        if (existing is not null)
            throw new InvalidOperationException("Email is already registered.");

        var user = new User
        {
            FullName     = dto.FullName,
            Email        = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role         = "User"
        };

        await _userRepo.CreateAsync(user);
        return new AuthResponseDto
        {
            Token    = GenerateToken(user),
            FullName = user.FullName,
            Email    = user.Email,
            Role     = user.Role
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userRepo.GetByEmailAsync(dto.Email)
            ?? throw new UnauthorizedAccessException("Invalid email or password.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        return new AuthResponseDto
        {
            Token    = GenerateToken(user),
            FullName = user.FullName,
            Email    = user.Email,
            Role     = user.Role
        };
    }

    private string GenerateToken(User user)
    {
        var jwtKey    = _config["Jwt:Key"]    ?? throw new InvalidOperationException("JWT Key not configured.");
        var jwtIssuer = _config["Jwt:Issuer"] ?? "SparkAishaAPI";
        var jwtAudience = _config["Jwt:Audience"] ?? "SparkAishaClient";

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email,          user.Email),
            new Claim(ClaimTypes.Name,           user.FullName),
            new Claim(ClaimTypes.Role,           user.Role),
        };

        var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer:   jwtIssuer,
            audience: jwtAudience,
            claims:   claims,
            expires:  DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
