import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

const ListingFavorite = ({listing, userFavorites}) => {
    const favoriteDisplay = () => {
        userFavorites.map((favorite) => {
            if (listing.id === favorite.listingId) {
                return <FontAwesomeIcon icon={solidStar}/>
            } else {
                return <FontAwesomeIcon icon={faStar}/>
            }
        })
    }
    return (
        <>
        {favoriteDisplay}
        </>
    )
}
export default ListingFavorite;
