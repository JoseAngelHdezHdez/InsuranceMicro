using BackendInsurance.DTOs.Auth;
using BackendInsurance.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendInsurance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private InsuranceContext _context;
        private IConfiguration _configuration;

        public AuthController(InsuranceContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == dto.Email);
            if (user == null)
                return Unauthorized("Invalid credentials.");

            // ⚠️ Si guardas password en texto plano (no recomendado):
            if (user.password != dto.Password)
                return Unauthorized("Invalid credentials.");

            // Si ya tienes Role name, úsalo. Si no, usa RoleID como claim.
            var tokenData = CreateJwtToken(user.UserID, user.username, user.email, user.RoleID);

            return Ok(new LoginResponseDto
            {
                Token = tokenData.Token,
                Expiration = tokenData.ExpiresAtUtc,
                Name = user.username,
                Email = user.email,
                RoleID = user.RoleID
            });
        }

        private (string Token, DateTime ExpiresAtUtc) CreateJwtToken(int userId, string username, string email, int roleId)
        {
            var jwt = _configuration.GetSection("Jwt");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.UtcNow.AddMinutes(int.Parse(jwt["ExpiresMinutes"]!));

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, roleId.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return (new JwtSecurityTokenHandler().WriteToken(token), expires);
        }
    }
}
