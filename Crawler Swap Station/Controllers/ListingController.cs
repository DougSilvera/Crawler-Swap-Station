using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Crawler_Swap_Station.Models;
using Crawler_Swap_Station.Repositories;
using System.Collections.Generic;

namespace Crawler_Swap_Station.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _listingRepository;
        private readonly IUserProfileRepository _profileRepository;
        private readonly IFavoriteRepository _favoriteRepository;

        public ListingController(IListingRepository listingRepository, IUserProfileRepository userProfileRepository, IFavoriteRepository favoriteRepository)
        {
            _listingRepository = listingRepository;
            _profileRepository = userProfileRepository;
            _favoriteRepository = favoriteRepository;
        }
        [HttpGet]
        public IActionResult GetAllListings()
        {
            return Ok(_listingRepository.GetAllListings());
        }
        [HttpGet("listingShort/{id}")]
        public IActionResult GetShortListing(int id)
        {
            return Ok(_listingRepository.GetListingById(id));
        }
        [HttpGet("{id}")]
        public IActionResult GetListingById(int id)
        {
            return Ok(_listingRepository.GetListingAndUserById(id));
        }
        [HttpPost]
        public IActionResult Post(Listing listing)
        {
            UserProfile user = GetCurrentUserProfile();
            listing.UserId = user.Id;
            listing.DateCreated = DateTime.Now;
            _listingRepository.AddListing(listing);
            return Ok(listing);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Listing listing)
        {
            _listingRepository.UpdateListing(listing);
            return Ok(listing);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _listingRepository.DeleteListing(id);
            return Ok();
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_listingRepository.Search(q));
        }
        [HttpGet("favorites/{listingId}")]
        public IActionResult GetUserFavorites(int listingId)
        {
            UserProfile profile = GetCurrentUserProfile();
            return Ok(_listingRepository.GetFavoriteListingIdsByUserId(profile.Id, listingId));
        }
        [HttpGet("getUserListings")]
        public IActionResult GetUserListings()
        {
            UserProfile userProfile = GetCurrentUserProfile();
            return Ok(_listingRepository.GetListingsByUserId(userProfile.Id));
        }
        [HttpGet("userFavoriteListings")]
        public IActionResult GetUserFavoriteListings()
        {
            UserProfile userprofile = GetCurrentUserProfile();
            List<Favorite> userFavorites = _favoriteRepository.GetFavoriteListingsByUserId(userprofile.Id);
            List<Listing> userFavoriteListings = new List<Listing>(); 
            foreach (Favorite favorite in userFavorites)
            {
                userFavoriteListings.Add(_listingRepository.GetListingAndUserById(favorite.ListingId));
            }
            return Ok(userFavoriteListings);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
