using System.ComponentModel.DataAnnotations;

namespace RestaurantsSearch.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }
        public int Score { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}