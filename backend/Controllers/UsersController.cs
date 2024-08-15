using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;
using System.Threading.Tasks;

namespace backend.Controllers
{
    // Route: api/users
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Context
        private readonly AppDbContext _context;

        // Constructor
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
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
        public async Task<IActionResult> Login(string email, string password)
        {
            // Find user by email and password
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                // Return 401 if user not found
                return Unauthorized(new { message = "Invalid credentials." });
            }

            // Return user
            return Ok(new { message = "Login successful", user });
        }
    }
}
