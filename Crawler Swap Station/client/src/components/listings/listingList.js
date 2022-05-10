import React from "react";
import Listing from "./listing";
import { useState, useEffect } from "react";
import { getAllListings } from "../../modules/listingManager";
import { Button, Row } from "reactstrap";
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

  const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
  };
  const listingChunks = chunk(listings, 3);

  const renderMarketTools = () => {
    if (toolbar === true) {
      return (
        <div style={{ width: "80%", margin: 5 }}>
          <ListingSearch setListings={setListings} />
          <div className="openToolbarButtons">
            <Button onClick={(evt) => setToolbar(false)}>Hide Tools</Button>
            <Button href="/marketplace/newListing">New Listing</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="toolButton" style={{ margin: 10 }}>
          <Button onClick={(evt) => setToolbar(true)}>Marketplace Tools</Button>
        </div>
      );
    }
  };

  const rows = listingChunks.map((listingChunk, i) => {
    const listingCards = listingChunk.map((listing) => {
      return (
        <Listing
          key={listing.id}
          listing={listing}
          userFavorites={userFavorites}
          setRender={setRender}
          render={render}
        />
      );
    });
    return (
      <Row className="listingRow" key={i}>
        {listingCards}
      </Row>
    );
  });
  return (
    <div className="marketplaceFeed">
      <div className="searchBar">{renderMarketTools()}</div>
      <div style={{ margin: 10 }}>{rows}</div>
    </div>
  );
};
export default MarketPlace;
