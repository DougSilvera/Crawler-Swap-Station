import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { addFavorite, deleteFavorite } from "../../modules/favoriteManager";

import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Listing = ({ listing, userFavorites, render, setRender }) => {
  const userFavorite = userFavorites.find(
    (favorite) => favorite.listingId === listing.id
  );

  const handleAddFavorite = (evt) => {
    evt.preventDefault();
    addFavorite(evt.target.id).then(() => {
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
          <FontAwesomeIcon
            id={listing.id}
            onClick={handleAddFavorite}
            icon={faStar}
          />
        </div>
      );
    }
  };
  return (
    <Card style={{ height: 200 }} key={listing.id}>
      <CardBody>
        <CardTitle>
          <Link to={`/marketplace/listingDetail/${listing.id}`}>
            {listing.title}
          </Link>
        </CardTitle>
        <CardSubtitle>${listing.price}</CardSubtitle>
        <CardText>{listing.body}</CardText>
        {favoriteDisplay()}
      </CardBody>
    </Card>
  );
};
export default Listing;
