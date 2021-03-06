using Crawler_Swap_Station.Models;
using System.Collections.Generic;

namespace Crawler_Swap_Station.Repositories
{
    public interface IListingRepository
    {
        public List<Listing> GetAllListings(); 
        public Listing GetListingAndUserById(int id);
        public Listing GetListingById(int id);
        public void AddListing(Listing listing);
        public void UpdateListing(Listing listing);
        public void DeleteListing(int id);
        public List<Listing> Search(string criterion);
        public Favorite GetFavoriteListingIdsByUserId(int userId, int listingId);
        public List<Listing> GetListingsByUserId(int id);
    }
}
