import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Alert,
} from "reactstrap";
import { getListingById } from "../../modules/listingManager";
import firebase from "firebase/app";
import "firebase/auth";
import { getByFireId } from "../../modules/authManager";
import { Link } from "react-router-dom";
import { deleteListing } from "../../modules/listingManager";
import { useHistory } from "react-router-dom";

const ListingDetail = () => {
  const history = useHistory();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [listing, setListing] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  const currentUser = firebase.auth().currentUser;
  const getListing = (listingId) => {
    getListingById(listingId).then((l) => setListing(l));
  };
  const getUserLoggedIn = (uid) => {
    getByFireId(uid).then((d) => setUserProfile(d));
  };
  useEffect(() => {
    getUserLoggedIn(currentUser.uid);
    getListing(id);
  }, [currentUser.uid, id]);

  const displayButtons = (userId, listingUserId, listingId) => {
    if (userId === listingUserId) {
      return (
        <div>
          <Link style={{ margin: 5 }} to={`/marketplace/edit/${listingId}`}>
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={(evt) => {
              setDeleteAlert(true);
            }}
          >
            Delete
          </Button>
        </div>
      );
    }
  };
  const handleDelete = (evt) => {
    evt.preventDefault();
    deleteListing(id).then(() => {
      history.push("/marketplace");
    });
  };

  const deleteAlertBox = () => {
    if (deleteAlert === true) {
      return (
        <div>
          <Alert color="primary">
            Hey! Are you sure you want to delete this ad?
          </Alert>
          <Button style={{ margin: 5 }} onClick={handleDelete}>
            Yes!
          </Button>
          <Button
            onClick={(evt) => {
              setDeleteAlert(false);
            }}
          >
            No go back!
          </Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      {deleteAlertBox()}
      <Card style={{ width: "%80" }}>
        <CardBody>
          <CardTitle>{listing.title}</CardTitle>
          <CardSubtitle>${listing.price}</CardSubtitle>
          <CardSubtitle>
            Seller: {listing.userProfile?.displayName}
          </CardSubtitle>
          <CardSubtitle>Date Listed: {listing.dateCreated}</CardSubtitle>
          <CardText>{listing.body}</CardText>
          {displayButtons(userProfile.id, listing.userId, listing.id)}
        </CardBody>
      </Card>
    </div>
  );
};
export default ListingDetail;
