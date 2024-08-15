using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;

namespace backend.Controllers
{
    // Route: api/books
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        // Context
        private readonly AppDbContext _context;

        // Constructor
        public BooksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/books/get
        [HttpGet("get")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            // Return all books
            return await _context.Books.ToListAsync();
        }

        // GET: api/books/get/{id}
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            // Find book by ID
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                // Return 404 if book not found
                return NotFound();
            }

            // Return book
            return book;
        }

        // POST: api/books/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateBook(Book book)
        {
            if (await BookTitleExists(book.Title))
            {
                // Return 400 if book title already exists
                return BadRequest(new { message = "A book with this title already exists" });
            }

            // Add book to context
            _context.Books.Add(book);
            // Save changes
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooks), new { id = book.BookId }, book);
        }

        private async Task<bool> BookTitleExists(string title)
        {
            return await _context.Books.AnyAsync(b => b.Title == title);
        }

        // PUT: api/books/update/{id}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                // Return 400 if book ID mismatch
                return BadRequest(new { message = "Book ID mismatch" });
            }

            // Update book state
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                // Save changes
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BookExists(id))
                {
                    // Return 404 if book not found
                    return NotFound(new { message = "Book not found" });
                }
                else
                {
                    // Throw error
                    throw;
                }
            }

            // Return success message
            return Ok(new { message = "Book updated successfully" });
        }


        // DELETE: api/books/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            // Find book by ID
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                // Return 404 if book not found
                return NotFound(new { message = "Book not found" });
            }

            // Remove book from context
            _context.Books.Remove(book);
            // Save changes
            await _context.SaveChangesAsync();

            // Return success message
            return Ok(new { message = "Book deleted successfully" });
        }

        // Check if book exists
        private async Task<bool> BookExists(int id)
        {
            return await _context.Books.AnyAsync(b => b.BookId == id);
        }
    }
}
