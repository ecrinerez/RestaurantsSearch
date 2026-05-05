using RestaurantsSearch.Models;

namespace RestaurantsSearch.Services
{
    public interface IRestaurantsService
    {
        Task<List<Restaurants>> GetRestaurantsAsync();
        Task<Restaurants?> GetRestaurantsByIdAsync(int id);
        Task<List<Restaurants>> SearchRestaurantsAsync(string? name, string? cuisine, string? city, string? postcode);
        Task<Restaurants> AddRestaurantsAsync(Restaurants restaurants);
        Task<Restaurants?> UpdateRestaurantsAsync(int id, Restaurants restaurants);
        Task<bool> DeleteRestaurantsAsync(int id);
        Task<List<Restaurants>> GetRestaurantsByCuisineAsync(string cuisine);
        Task<List<Restaurants>> GetRestaurantsByRatingAsync(double minRating);
        Task<List<Restaurants>> GetRestaurantsByManagerAsync(int managerId);
    }
}