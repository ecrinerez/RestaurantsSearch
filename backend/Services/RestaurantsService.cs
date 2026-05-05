using Microsoft.EntityFrameworkCore;
using RestaurantsSearch.Datas;
using RestaurantsSearch.Models;

namespace RestaurantsSearch.Services
{
    public class RestaurantsService : IRestaurantsService
    {
        private readonly RestaurantsDbContext _context;

        public RestaurantsService(RestaurantsDbContext context)
        {
            _context = context;
        }

        public async Task<List<Restaurants>> GetRestaurantsAsync()
        {
            return await _context.Restaurants.ToListAsync();
        }

        public async Task<Restaurants?> GetRestaurantsByIdAsync(int id)
        {
            return await _context.Restaurants.FindAsync(id);
        }

        public async Task<Restaurants> AddRestaurantsAsync(Restaurants restaurants)
        {
            _context.Restaurants.Add(restaurants);
            await _context.SaveChangesAsync();
            return restaurants;
        }

        public async Task<Restaurants?> UpdateRestaurantsAsync(int id, Restaurants restaurants)
        {
            var existing = await _context.Restaurants.FindAsync(id);
            if (existing == null) return null;

            existing.Name = restaurants.Name;
            existing.Address = restaurants.Address;
            existing.City = restaurants.City;
            existing.Postcode = restaurants.Postcode;
            existing.PhoneNumber = restaurants.PhoneNumber;
            existing.Cuisine = restaurants.Cuisine;
            existing.Rating = restaurants.Rating;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteRestaurantsAsync(int id)
        {
            var restaurants = await _context.Restaurants.FindAsync(id);
            if (restaurants == null) return false;

            _context.Restaurants.Remove(restaurants);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Restaurants>> SearchRestaurantsAsync(string? name, string? cuisine, string? city, string? postcode)
        {
            var query = _context.Restaurants.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(r => r.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(cuisine))
            {
                query = query.Where(r => r.Cuisine.Contains(cuisine));
            }

            if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(r => r.City.Contains(city));
            }

            if (!string.IsNullOrEmpty(postcode))
            {
                query = query.Where(r => r.Postcode.Contains(postcode));
            }

            return await query.ToListAsync();
        }

        public async Task<List<Restaurants>> GetRestaurantsByCuisineAsync(string cuisine)
        {
            return await _context.Restaurants
                .Where(r => r.Cuisine.Contains(cuisine))
                .ToListAsync();
        }

        public async Task<List<Restaurants>> GetRestaurantsByRatingAsync(double minRating)
        {
            return await _context.Restaurants
                .Where(r => r.Rating >= minRating)
                .ToListAsync();
        }
        public async Task<List<Restaurants>> GetRestaurantsByManagerAsync(int managerId)
        {
            return await _context.Restaurants
                .Where(r => r.ManagerId == managerId)
                .ToListAsync();
        }
    }
}
