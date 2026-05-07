using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantsSearch.Datas;
using RestaurantsSearch.Models;

namespace RestaurantsSearch.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly RestaurantsDbContext _context;

        public RatingController(RestaurantsDbContext context)
        {
            _context = context;
        }

        [HttpGet("getRestaurantData/{userId}/{restaurantId}")]
        public async Task<IActionResult> GetRestaurantData(int userId, int restaurantId)
        {
            var userRating = await _context.Ratings
                .FirstOrDefaultAsync(r => r.UserId == userId && r.RestaurantId == restaurantId);

            var dbRatings = await _context.Ratings
                .Where(r => r.RestaurantId == restaurantId)
                .Select(r => r.Score)
                .ToListAsync();

            double baseAvg = 4.2; 
            int baseCount = 10;   
            
            double totalSum = dbRatings.Sum() + (baseAvg * baseCount);
            int totalCount = dbRatings.Count + baseCount;
            double finalAverage = totalSum / totalCount;

            return Ok(new 
            { 
                userScore = userRating?.Score ?? 0,
                averageRating = Math.Round(finalAverage, 1)
            });
        }

        [HttpPost("rate")]
        public async Task<IActionResult> RateRestaurant([FromBody] Rating rating)
        {
            var existingRating = await _context.Ratings
                .FirstOrDefaultAsync(r => r.UserId == rating.UserId && r.RestaurantId == rating.RestaurantId);

            if (existingRating != null)
            {
                existingRating.Score = rating.Score;
            }
            else
            {
                _context.Ratings.Add(rating);
            }

            await _context.SaveChangesAsync();

            var dbRatings = await _context.Ratings
                .Where(r => r.RestaurantId == rating.RestaurantId)
                .Select(r => r.Score)
                .ToListAsync();

            double baseAvg = 4.2;
            int baseCount = 10;
            
            double totalSum = dbRatings.Sum() + (baseAvg * baseCount);
            int totalCount = dbRatings.Count + baseCount;
            double finalAverage = totalSum / totalCount;

            return Ok(new 
            { 
                averageRating = Math.Round(finalAverage, 1), 
                voteCount = totalCount 
            });
        }
    }
}