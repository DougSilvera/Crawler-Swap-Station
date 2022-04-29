using Crawler_Swap_Station.Models;
using System.Collections.Generic;

namespace Crawler_Swap_Station.Repositories
{
    public interface IFavoriteRepository
    {
        void AddFavorite(Favorite favorite);
        void DeleteFavorite(int id);
        public List<Favorite> GetFavoriteListingsByUserId(int userId);
    }
}