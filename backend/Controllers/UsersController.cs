using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace backend.Controllers
{
    // Route:https://localhost:7105/api/users
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Context
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;


        // Constructor
        public UsersController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                // Return 400 if user with email already exists
                return BadRequest(new { message = "User with this email already exists." });
            }

            // Add user to context
            _context.Users.Add(user);
            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", user });
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            // Find user by email and password
            var loginUser = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);

            if (loginUser == null)
            {
                // Return 401 if user not found
                return Unauthorized(new { message = "Invalid credentials." });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, loginUser.UserId.ToString()),
                    new Claim(ClaimTypes.Email, loginUser.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Return user
            return Ok(new { message = "Login successful", token = tokenString });
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
    }
}
