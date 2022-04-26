using System.ComponentModel.DataAnnotations;

namespace Crawler_Swap_Station.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
    }
}
