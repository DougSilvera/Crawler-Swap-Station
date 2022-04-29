import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getShortListingById,
  updateListing,
} from "../../modules/listingManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const ListingEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const emptyPost = {
    id: "",
    userId: "",
    dateCreated: "",
    title: "",
    body: "",
    price: "",
  };
  const [listing, setListing] = useState(emptyPost);

  useEffect(() => {
    getShortListingById(id).then(setListing);
  }, [id]);
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const listingCopy = { ...listing };

    listingCopy[key] = value;
    setListing(listingCopy);
  };
  const handleSave = (evt) => {
    evt.preventDefault();
    updateListing(listing).then(() => {
      history.push(`/marketplace/listingDetail/${listing.id}`);
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
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
          value={listing.price}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>
        Submit
      </Button>
    </Form>
  );
};
export default ListingEdit;
