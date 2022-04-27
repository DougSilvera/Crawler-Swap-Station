import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { getListingById } from "../../modules/listingManager";

const ListingDetail = () => {
  const [listing, setListing] = useState({});
  const { id } = useParams();

  const getListing = (listingId) => {
    getListingById(listingId).then((l) => setListing(l));
  };

  useEffect(() => {
      getListing(id)
  }, [id])
debugger
  return (
      
      <Card style={{width: "%80"}}>
          <CardBody>
              <CardTitle>{listing.title}</CardTitle>
              <CardSubtitle>${listing.price}</CardSubtitle>
              <CardSubtitle>Seller: {listing.userProfile?.displayName}</CardSubtitle>
              <CardSubtitle>Date Listed: {listing.dateCreated}</CardSubtitle>
              <CardText>{listing.body}</CardText>
          </CardBody>
      </Card>

     
  )
};
export default ListingDetail