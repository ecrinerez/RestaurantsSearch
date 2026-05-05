using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantsSearch.Datas;
using RestaurantsSearch.Models;

namespace RestaurantsSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RestaurantsDbContext _context;

        public AuthController(RestaurantsDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("This email is already in use.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Registration successful.");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(User loginData)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginData.Email);
            
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            if (!BCrypt.Net.BCrypt.Verify(loginData.PasswordHash, user.PasswordHash))
            {
                return BadRequest("Invalid password.");
            }

            return Ok(new { 
                Message = "Login successful!", 
                UserId = user.Id, 
                UserRole = user.Role.ToString(),
                FullName = user.FullName 
            });
        }
    }
}