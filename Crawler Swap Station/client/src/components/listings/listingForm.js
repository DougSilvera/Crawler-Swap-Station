import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addListing } from "../../modules/listingManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ImageUploader from "./listingImage";
import {
  addImageCssDb,
  uploadImageToCloudinary,
} from "../../modules/imageManager";
import { Carousel, CarouselItem } from "react-bootstrap";
const ListingForm = () => {
  const history = useHistory();
  const emptyPost = {
    title: "",
    body: "",
    price: "",
  };
  const [listing, setListing] = useState(emptyPost);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const listingCopy = { ...listing };

    listingCopy[key] = value;
    setListing(listingCopy);
  };
  const handleSave = async (evt) => {
    debugger;
    evt.preventDefault();
    const listingresponse = await addListing(listing);
    images.forEach((image) => {
      image.listingId = listingresponse.id;
      addImageCssDb(image);
    });
    history.push("/marketplace");
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const image = {
      listingId: "",
      imageUrl: "",
    };
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "CrawlerSwapStation");
    setLoading(true);

    const res = await uploadImageToCloudinary(data);
    const file = await res.json();
    image.imageUrl = file.secure_url;
    const imagesCopy = [...images];
    imagesCopy.push(image);
    setImages(imagesCopy);
    setLoading(false);
  };

  const imageLoader = () => {
    if (loading === true) {
      return <h3>Loading....</h3>;
    } else {
      return (
        <div className="pictureCarousel">
          <Carousel
            variant={"dark"}
            interval={null}
            style={{ width: "1000px" }}
          >
            {images.map((image) => {
              return (
                <CarouselItem>
                  <img
                    className="d-block w-100"
                    src={`${image.imageUrl}`}
                    alt="slide"
                  />
                </CarouselItem>
              );
            })}
          </Carousel>
        </div>
      );
    }
  };

  return (
    <>
      <div>{imageLoader()}</div>
      <ImageUploader uploadImage={uploadImage} />
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Listing Title"
            value={listing.title}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="body"
            placeholder="Listing Description"
            value={listing.body}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Price">Price</Label>
          <Input
            type="number"
            name="Price"
            id="price"
            placeholder="Listing Price"
            value={listing.price}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button className="btn btn-primary" onClick={handleSave}>
          Submit
        </Button>
      </Form>
    </>
  );
};
export default ListingForm;
