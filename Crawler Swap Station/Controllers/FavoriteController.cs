using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Crawler_Swap_Station.Models;
using Crawler_Swap_Station.Repositories;

namespace Crawler_Swap_Station.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IUserProfileRepository _profileRepository;

        public FavoriteController(IFavoriteRepository favoriteRepository, IUserProfileRepository userProfileRepository)
        {
            _favoriteRepository = favoriteRepository;
            _profileRepository = userProfileRepository;
        }
        [HttpPost("{listingId}")]
        public IActionResult AddUserFavorite(int listingId)
        {
            UserProfile profile = GetCurrentUserProfile();
            Favorite favorite = new Favorite()
            {
                UserId = profile.Id,
                ListingId = listingId,
            };
            _favoriteRepository.AddFavorite(favorite);
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUserFavorite(int id)
        {
            _favoriteRepository.DeleteFavorite(id);
            return Ok();
        }
        [HttpGet("userfavorites")]
        public IActionResult GetUserFavorites()
        {
            UserProfile userProfile = GetCurrentUserProfile();
            return Ok(_favoriteRepository.GetFavoriteListingsByUserId(userProfile.Id));
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
