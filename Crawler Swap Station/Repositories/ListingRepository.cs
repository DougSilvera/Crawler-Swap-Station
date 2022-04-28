using Crawler_Swap_Station.Models;
using Crawler_Swap_Station.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Crawler_Swap_Station.Repositories
{
    public class ListingRepository : BaseRepository, IListingRepository
    {
        public ListingRepository(IConfiguration configuration) : base(configuration) { }

        public List<Listing> GetAllListings()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserId, DateCreated, Title, Body, Price FROM Listing ORDER BY DateCreated DESC;";

                    List<Listing> listings = new List<Listing>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        listings.Add(new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Body = DbUtils.GetString(reader, "Body"),
                            Price = DbUtils.GetInt(reader, "Price")

                        });
                    }
                    reader.Close();
                    return listings;
                }
            }
        }
        public Listing GetListingAndUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT l.Id, 
                                               l.UserId, 
                                               l.DateCreated, 
                                               l.Title, 
                                               l.Body, 
                                               l.Price, 
                                               u.DisplayName 
                                       FROM Listing l 
                                       LEFT JOIN UserProfile u ON l.UserId = u.Id 
                                       WHERE l.Id= @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    Listing listing = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        listing = new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Body = DbUtils.GetString(reader, "Body"),
                            Price = DbUtils.GetInt(reader, "Price"),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        };
                    }
                    conn.Close();
                    return listing;
                }
            }
        }

        public Listing GetListingById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, 
                                               UserId, 
                                               DateCreated, 
                                               Title, 
                                               Body, 
                                               Price
                                       FROM Listing 
                                       WHERE Id= @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    Listing listing = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        listing = new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Body = DbUtils.GetString(reader, "Body"),
                            Price = DbUtils.GetInt(reader, "Price"),
                            
                        };
                    }
                    conn.Close();
                    return listing;
                }
            }
        }
        public void AddListing(Listing listing)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Listing
                                                    (UserId, 
                                                     DateCreated,
                                                     Title,
                                                     Body,
                                                     Price)
                                        OUTPUT INSERTED.ID
                                        VALUES 
                                                     (@UserId, 
                                                      @DateCreated, 
                                                      @Title,
                                                      @Body,
                                                      @Price);";
                    DbUtils.AddParameter(cmd, "@UserId", listing.UserId);
                    DbUtils.AddParameter(cmd, "@DateCreated", listing.DateCreated);
                    DbUtils.AddParameter(cmd, "@Title", listing.Title);
                    DbUtils.AddParameter(cmd, "@Body", listing.Body);
                    DbUtils.AddParameter(cmd, "@Price", listing.Price);
                    

                    listing.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void UpdateListing(Listing listing)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Listing
                                        SET UserId = @UserId,
                                            DateCreated = @DateCreated,
                                            Title = @Title,
                                            Body = @Body,
                                            Price = @Price
                                        WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@UserId", listing.UserId);
                    DbUtils.AddParameter(cmd, "@DateCreated", listing.DateCreated);
                    DbUtils.AddParameter(cmd, "@Title", listing.Title);
                    DbUtils.AddParameter(cmd, "@Body", listing.Body);
                    DbUtils.AddParameter(cmd, "@Price", listing.Price);
                    DbUtils.AddParameter(cmd, "@id", listing.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteListing(int id)
        {


            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Listing WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }

        }


        public List<Listing> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, 
                                               UserId, 
                                               DateCreated, 
                                               Title, 
                                               Body, 
                                               Price 
                                        FROM Listing    
                                        WHERE Title LIKE @Criterion OR Body LIKE @Criterion 
                                        ORDER BY DateCreated DESC;";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    List<Listing> listings = new List<Listing>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        listings.Add(new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Body = DbUtils.GetString(reader, "Body"),
                            Price = DbUtils.GetInt(reader, "Price")

                        });
                    }
                    reader.Close();
                    return listings;
                }
            }
        }

    }
}
