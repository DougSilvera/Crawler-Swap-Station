import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { getListingById } from "../../modules/listingManager";
import firebase from "firebase/app";
import "firebase/auth";
import { getByFireId } from "../../modules/authManager";
import { Link } from "react-router-dom";


const ListingDetail = () => {
  const [listing, setListing] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  const currentUser = firebase.auth().currentUser
  const getListing = (listingId) => {
    getListingById(listingId).then((l) => setListing(l));
  };
  const getUserLoggedIn = (uid) => {
    getByFireId(uid).then((d) => setUserProfile(d))
  }
  useEffect(() => {
    getUserLoggedIn(currentUser.uid)
    getListing(id)
  },[id, currentUser.uid])

const displayButtons = (userId, listingUserId, listingId) => {
    if (userId === listingUserId) {
      return <div>
        <Link style={{margin: 5}}to={`/marketplace/edit/${listingId}`}>Edit</Link>
        <Link to={`/marketplace/delete/${listingId}`}>Delete</Link>
      </div>
    }
  
}

  return (
      
      <Card style={{width: "%80"}}>
          <CardBody>
              <CardTitle>{listing.title}</CardTitle>
              <CardSubtitle>${listing.price}</CardSubtitle>
              <CardSubtitle>Seller: {listing.userProfile?.displayName}</CardSubtitle>
              <CardSubtitle>Date Listed: {listing.dateCreated}</CardSubtitle>
              <CardText>{listing.body}</CardText>
              {displayButtons(userProfile.id, listing.userId, listing.id)}
          </CardBody>
      </Card>

     
  )
};
export default ListingDetail
