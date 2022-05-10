import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  getListingById,
  getUserFavoriteListing,
} from "../../modules/listingManager";
import "firebase/auth";
import { getLoggedInUser } from "../../modules/authManager";
import { Link } from "react-router-dom";
import { deleteListing } from "../../modules/listingManager";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { addFavorite, deleteFavorite } from "../../modules/favoriteManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { getImagesByListingId } from "../../modules/imageManager";
import { Carousel, CarouselItem } from "react-bootstrap";

const ListingDetail = () => {
  const history = useHistory();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [listing, setListing] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  const [userFavorite, setUserFavorite] = useState(null);
  const [render, setRender] = useState(1);
  const [images, setImages] = useState([])

  const getListing = (listingId) => {
    getListingById(listingId).then((l) => setListing(l));
  };

  const getUserFavorites = (listingId) => {
    getUserFavoriteListing(listingId).then((d) => setUserFavorite(d));
  };

  const getUserLoggedIn = () => {
    getLoggedInUser().then((d) => setUserProfile(d));
  };

  const getImages = (listingId) => {
    getImagesByListingId(listingId).then((d) => setImages(d))
  }

  useEffect(() => {
    getUserLoggedIn();
    getListing(id);
    getUserFavorites(id);
    getImages(id);
  }, [id, render]);

  const displayButtons = (userId, listingUserId, listingId) => {
    if (userFavorite === null) {
      return null;
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
      return null;
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
      <div>
        <Modal isOpen={deleteAlert}>
          <ModalHeader
            toggle={(evt) => {
              setDeleteAlert(false);
            }}
          >
            Hey You!
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this ad?</ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </Modal>
      </div>
      <Card style={{ width: "%80" }}>
        <CardBody>
          <div className="pictureCarousel">
          <Carousel variant={"dark"} interval = {null} style={{ width: "1000px" }}>
            {images.map((image) => {
              return <CarouselItem>
                
                <img className="d-block w-100"
                     src={`${image.imageUrl}`}
                     alt="slide" 
                     />

              
              </CarouselItem>
            })}
          </Carousel>

          </div>
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
