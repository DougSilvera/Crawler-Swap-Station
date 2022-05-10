using Crawler_Swap_Station.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Crawler_Swap_Station.Utils;

namespace Crawler_Swap_Station.Repositories
{
    public class ImageRepository : BaseRepository, IImageRepository
    {
        public ImageRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public void Add(Image image)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Image
                                                    (ListingId,
                                                     ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@ListingId,
                                                @ImageUrl)";
                    DbUtils.AddParameter(cmd, "@ListingId", image.ListingId);
                    DbUtils.AddParameter(cmd, "@ImageUrl", image.ImageUrl);

                    image.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Image WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Image> GetByListingId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               ListingId,
                                               ImageUrl
                                        FROM Image
                                        WHERE ListingId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    List<Image> images = new List<Image>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        images.Add(new Image()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ListingId = DbUtils.GetInt(reader,"ListingId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl")

                        });
                    }
                    reader.Close();
                    return images;
                }
            }
        }
    }
}
