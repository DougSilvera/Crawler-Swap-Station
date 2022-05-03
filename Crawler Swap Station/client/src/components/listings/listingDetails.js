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
import {
  getListingById,
  getUserFavoriteListing,
} from "../../modules/listingManager";
import firebase from "firebase/app";
import "firebase/auth";
import { getByFireId } from "../../modules/authManager";
import { Link } from "react-router-dom";
import { deleteListing } from "../../modules/listingManager";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { addFavorite, deleteFavorite } from "../../modules/favoriteManager";

const ListingDetail = () => {
  const history = useHistory();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [listing, setListing] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  const [userFavorite, setUserFavorite] = useState(null);
  const [render, setRender] = useState(1);
  const currentUser = firebase.auth().currentUser;

  const getListing = (listingId) => {
    getListingById(listingId).then((l) => setListing(l));
  };

  const getUserFavorites = (listingId) => {
    getUserFavoriteListing(listingId).then((d) => setUserFavorite(d));
  };

  const getUserLoggedIn = (uid) => {
    getByFireId(uid).then((d) => setUserProfile(d));
  };

  useEffect(() => {
    getUserLoggedIn(currentUser.uid);
    getListing(id);
    getUserFavorites(id);
  }, [currentUser.uid, id, render]);

  const displayButtons = (userId, listingUserId, listingId) => {
    if (userFavorite === null) {
      return null
    } else if (userId === listingUserId) {
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
  const favoriteDisplay = (favorite) => {
    if (favorite === null) {
      return null
    } else if (favorite.listingId === listing.id) {
      return (
        <div>
          <FontAwesomeIcon
            size="3x"
            onClick={handleRemoveFavorite}
            value={favorite.id}
            icon={solidStar}
          />
        </div>
      );
    } else {
      return (
        <div>
          <FontAwesomeIcon
            id={listing.id}
            value={favorite.id}
            onClick={handleAddFavorite}
            size="3x"
            icon={faStar}
          />
        </div>
      );
    }
  };
  return (
    <div>
      {deleteAlertBox()}
      <Card style={{ width: "%80" }}>
        <CardBody>
          {favoriteDisplay(userFavorite)}
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
