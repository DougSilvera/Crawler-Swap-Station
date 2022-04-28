using Crawler_Swap_Station.Models;

namespace Crawler_Swap_Station.Repositories
{
    public interface IFavoriteRepository
    {
        void AddFavorite(Favorite favorite);
        void DeleteFavorite(int id);
    }
}