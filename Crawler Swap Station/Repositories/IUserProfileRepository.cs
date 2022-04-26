using Crawler_Swap_Station.Models;

namespace Crawler_Swap_Station.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}
