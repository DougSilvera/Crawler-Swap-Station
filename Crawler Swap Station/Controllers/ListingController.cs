using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Crawler_Swap_Station.Models;
using Crawler_Swap_Station.Repositories;

namespace Crawler_Swap_Station.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _listingRepository;
        private readonly IUserProfileRepository _profileRepository;

        public ListingController(IListingRepository listingRepository, IUserProfileRepository userProfileRepository)
        {
            _listingRepository = listingRepository;
            _profileRepository = userProfileRepository;
        }
        [HttpGet]
        public IActionResult GetAllListings()
        {
            return Ok(_listingRepository.GetAllListings());
        }
        [HttpGet("{id}")]
        public IActionResult GetListingById(int id)
        {
            return Ok(_listingRepository.GetListingById(id));
        }
        [HttpPost]
        public IActionResult Post(Listing listing)
        {
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
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
