import React from "react";
import Listing from "./listing";
import { useState, useEffect } from "react";
import { getAllListings } from "../../modules/listingManager";
import { CardColumns, Button } from "reactstrap";
import { getUserFavorites } from "../../modules/favoriteManager";
import ListingSearch from "./listingSearch";

const MarketPlace = () => {
  const [listings, setListings] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [render, setRender] = useState(1);
  const [toolbar, setToolbar] = useState(false);

  const getListings = () => {
    getAllListings().then((l) => setListings(l));
  };

  const getFavorites = () => {
    getUserFavorites().then((f) => setUserFavorites(f));
  };

  useEffect(() => {
    getListings();
    getFavorites();
  }, [render]);

  const renderMarketTools = () => {
    if (toolbar === true) {
      return (
       <div>

         <ListingSearch setListings={setListings} />
         <div className="openToolbarButtons">

         <Button onClick={(evt) => setToolbar(false)}>Hide Tools</Button>
         <Button href="/marketplace/newListing">New Listing</Button>
         </div>

       </div>
        
      );
    } else {
      return(
         <div className="toolButton">
           <Button  onClick={(evt) => setToolbar(true)}>Marketplace Tools</Button>
         </div>
      ) 
    }
  };

  return (
    <div>
      {renderMarketTools()}
      <CardColumns>
        {listings.map((listing) => {
          return (
            <Listing
              key={listing.id}
              listing={listing}
              userFavorites={userFavorites}
              setRender={setRender}
              render={render}
            />
          );
        })}
      </CardColumns>
    </div>
  );
};
export default MarketPlace;
