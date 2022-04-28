import React from "react";
import Listing from "./listing";
import { useState, useEffect } from "react";
import { getAllListings, SearchListings } from "../../modules/listingManager";
import { CardColumns, Input,FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";

const MarketPlace = () => {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState("");

  const getListings = () => {
    getAllListings().then((l) => setListings(l));
  };

  useEffect(() => {
    getListings();
  }, []);
  const handleInputChange = (evt) => {
      let queryCopy = {...query}
      queryCopy = evt.target.value
      setQuery(queryCopy);
  }
  const handleSearch = (evt) => {
    evt.preventDefault();
    SearchListings(query).then((d) => setListings(d))
  }

  return (
    <div>
      <Link to="/marketplace/newListing">New Listing</Link>
      <FormGroup>
              
                <Input placeholder="search here" onChange={handleInputChange}/>
                <Button onClick={handleSearch}>Search</Button>
      </FormGroup>
      <CardColumns>
        {listings.map((listing) => {
          return <Listing listing={listing} />;
        })}
      </CardColumns>
    </div>
  );
};
export default MarketPlace;
