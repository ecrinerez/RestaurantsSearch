using Microsoft.EntityFrameworkCore;
using RestaurantsSearch.Models;

namespace RestaurantsSearch.Datas
{
    public class RestaurantsDbContext : DbContext
    {
        public RestaurantsDbContext(DbContextOptions<RestaurantsDbContext> options) : base(options)
        {
        }

        public DbSet<Restaurants> Restaurants { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}