import React from "react";
import Listing from "./listing";
import { useState, useEffect } from "react";
import { getAllListings } from "../../modules/listingManager";
import { CardColumns } from "reactstrap";
import { Link } from "react-router-dom";

const MarketPlace = () => {
  const [listings, setListings] = useState([]);

  const getListings = () => {
    getAllListings().then((l) => setListings(l));
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div>
      <Link to="/marketplace/newListing">New Listing</Link>
        
      <CardColumns>
        {listings.map((listing) => {
          return <Listing listing={listing} />;
        })}
      </CardColumns>
    </div>
  );
};
export default MarketPlace;
