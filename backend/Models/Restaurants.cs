using System.ComponentModel.DataAnnotations;

namespace RestaurantsSearch.Models
{
    public class Restaurants
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = "";

        [Required]
        [MaxLength(100)]
        public string Address { get; set; } = "";

        [Required]
        public string City { get; set; } = "";
        
        [Required]
        public string Postcode { get; set; } = "";

        public string PhoneNumber { get; set; } = "";

        [Required]
        public string Cuisine { get; set; } = "";

        [Range(0, 5)]
        public double Rating { get; set; }
        [Required]
        public int ManagerId { get; set; } 
        
        public User? Manager { get; set; }
    }
}