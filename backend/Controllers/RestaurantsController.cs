using Microsoft.AspNetCore.Mvc;
using RestaurantsSearch.Models;
using RestaurantsSearch.Services;

namespace RestaurantsSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly IRestaurantsService service;

        public RestaurantsController(IRestaurantsService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Restaurants>>> GetRestaurants() => Ok(await service.GetRestaurantsAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurants>> GetRestaurantsById(int id)
        {
            var res = await service.GetRestaurantsByIdAsync(id);
            return res == null ? NotFound() : Ok(res);
        }

        // YENİ: Manager'ın sadece kendi restoranlarını görmesi için
        [HttpGet("my-restaurants/{managerId}")]
        public async Task<ActionResult<List<Restaurants>>> GetMyRestaurants(int managerId)
        {
            return Ok(await service.GetRestaurantsByManagerAsync(managerId));
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Restaurants>>> Search([FromQuery] string? name, [FromQuery] string? cuisine, [FromQuery] string? city, [FromQuery] string? postcode)
        {
            return Ok(await service.SearchRestaurantsAsync(name, cuisine, city, postcode));
        }

        [HttpPost]
        public async Task<ActionResult<Restaurants>> Add(Restaurants restaurants)
        {
            var result = await service.AddRestaurantsAsync(restaurants);
            return CreatedAtAction(nameof(GetRestaurantsById), new { id = result.Id }, result);
        }

    
        [HttpPut("{id}")]
        public async Task<ActionResult<Restaurants>> Update(int id, Restaurants restaurants, [FromQuery] int currentManagerId)
        {
            var existing = await service.GetRestaurantsByIdAsync(id);
            if (existing == null) return NotFound();
            
            // TAPU KONTROLÜ: Gelen ManagerId dükkanın sahibiyle aynı mı?
            if (existing.ManagerId != currentManagerId) 
                return Forbid("Bu restoranı güncelleme yetkiniz yok!");

            var updated = await service.UpdateRestaurantsAsync(id, restaurants);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] int currentManagerId)
        {
            var existing = await service.GetRestaurantsByIdAsync(id);
            if (existing == null) return NotFound();

            if (existing.ManagerId != currentManagerId) 
                return Forbid("Bu restoranı silme yetkiniz yok!");

            await service.DeleteRestaurantsAsync(id);
            return NoContent();
        }
    }
}