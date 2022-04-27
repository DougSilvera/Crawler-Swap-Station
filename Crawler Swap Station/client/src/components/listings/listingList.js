import React from "react";
import Listing from "./listing";
import { useState, useEffect } from "react";
import { getAllListings } from "../../modules/listingManager";
import { CardColumns } from "reactstrap";

const MarketPlace = () => {
    const [listings, setListings] = useState([])

    const getListings = () => {
        getAllListings().then((l) => setListings(l))
    }

    useEffect(() => {
        getListings();
    }, []);

    return (
        <CardColumns>
            {listings.map((listing) => {
                return <Listing listing = {listing} />
            })}
        </CardColumns>
    )
}
export default MarketPlace