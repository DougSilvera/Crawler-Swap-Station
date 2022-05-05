using Crawler_Swap_Station.Models;
using System.Collections.Generic;

namespace Crawler_Swap_Station.Repositories
{
    public interface IImageRepository
    {
        public void Add(Image image);
        public void Delete(int id);
        public List<Image> GetByListingId(int id);
    }
}
