import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { addFavorite, deleteFavorite } from "../../modules/favoriteManager";

import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { getImagesByListingId } from "../../modules/imageManager";

const Listing = ({ listing, userFavorites, render, setRender }) => {
  const [images, setImages] = useState([]);

  const getImages = (listingId) => {
    getImagesByListingId(listingId).then((d) => setImages(d));
  };

  useEffect(() => {
    getImages(listing.id);
  }, [listing.id]);
  const userFavorite = userFavorites.find(
    (favorite) => favorite.listingId === listing.id
  );
  const image = images[0];
  const handleAddFavorite = (evt) => {
    evt.preventDefault();
    addFavorite(listing.id).then(() => {
      setRender(render + 1);
    });
  };

  const handleRemoveFavorite = (evt) => {
    evt.preventDefault();
    deleteFavorite(userFavorite.id).then(() => {
      setRender(render + 2);
    });
  };

  const favoriteDisplay = () => {
    if (userFavorites.some((u) => u.listingId === listing.id)) {
      return (
        <div>
          <FontAwesomeIcon onClick={handleRemoveFavorite} icon={solidStar} />
        </div>
      );
    } else {
      return (
        <div>
          <FontAwesomeIcon onClick={handleAddFavorite} icon={faStar} />
        </div>
      );
    }
  };

  const imageDisplay = () => {
    if (image) {
      return (
        <img
          src={`${image?.imageUrl}`}
          alt="listing"
          style={{ width: "250px" }}
        />
      );
    } else {
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
          alt="listing"
          style={{ width: "150px" }}
        />
      );
    }
  };

  return (
    <Card style={{ height: 350, width: "28%", margin: "10px" }} key={listing.id}>
      <CardBody>
        <CardTitle className="listingImage">{imageDisplay()}</CardTitle>
        <CardSubtitle>
          <Link to={`/marketplace/listingDetail/${listing.id}`}>
            {listing.title}
          </Link>
        </CardSubtitle>
        <CardSubtitle>Price: ${listing.price}</CardSubtitle>
        <CardText className="listingBody"><text className="listingText" >Description: {listing.body}</text></CardText>
        {favoriteDisplay()}
      </CardBody>
    </Card>
  );
};
export default Listing;
