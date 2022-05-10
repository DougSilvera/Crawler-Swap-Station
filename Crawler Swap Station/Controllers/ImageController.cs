using Microsoft.AspNetCore.Authorization;
using Crawler_Swap_Station.Models;
using Crawler_Swap_Station.Repositories;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crawler_Swap_Station.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;

        public ImageController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }
        [HttpGet("{id}")]
        public IActionResult GetImagesByListingId(int id)
        {
            return Ok(_imageRepository.GetByListingId(id));
        }
        [HttpPost]
        public IActionResult AddImage(Image image)
        {
            _imageRepository.Add(image);
            return Ok(image);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteImage(int id)
        {
            _imageRepository.Delete(id);
            return Ok();
        }
    }
}
