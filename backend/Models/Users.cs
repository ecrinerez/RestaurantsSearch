using System.ComponentModel.DataAnnotations;

namespace RestaurantsSearch.Models
{
    public enum UserRole
    {
        Customer = 0,
        Manager = 1
    }
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string PasswordHash { get; set; } = ""; 

        public string FullName { get; set; } = "";

        public UserRole Role { get; set; } = UserRole.Customer; 
    }
}