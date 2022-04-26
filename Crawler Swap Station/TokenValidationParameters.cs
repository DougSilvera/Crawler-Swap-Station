
namespace Crawler_Swap_Station
{
    internal class TokenValidationParameters : Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        public bool ValidateIssuer { get; set; }
        public string ValidIssuer { get; set; }
        public bool ValidateAudience { get; set; }
        public string ValidAudience { get; set; }
        public bool ValidateLifetime { get; set; }
    }
}