using System;
using System.ComponentModel.DataAnnotations;

namespace Crawler_Swap_Station.Models
{
    public class Listing
    {
        public int Id { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public int Price { get; set; }
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int ScaleId { get; set; }
        public int VehicleId { get; set; }

    }
}
