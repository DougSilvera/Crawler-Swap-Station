using Crawler_Swap_Station.Models;
using Crawler_Swap_Station.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Crawler_Swap_Station.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public void AddFavorite(Favorite favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserFavorite
                                                    (UserId, ListingId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserId, @ListingId);";
                    DbUtils.AddParameter(cmd, "@UserId", favorite.UserId);
                    DbUtils.AddParameter(cmd, "@ListingId", favorite.ListingId);

                    favorite.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteFavorite(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserFavorite
                                        WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public List<Favorite> GetFavoriteListingsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserId, ListingId 
                                       FROM UserFavorite
                                       WHERE UserId = @id;";

                    DbUtils.AddParameter(cmd, "@id", userId);
                    List<Favorite> favorites = new List<Favorite>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ListingId = DbUtils.GetInt(reader, "ListingId")
                        });
                    }
                    reader.Close();
                    return favorites;
                }
            }
        }
    }
}
