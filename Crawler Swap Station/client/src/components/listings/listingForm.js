import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addListing } from "../../modules/listingManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const ListingForm = () => {
  const history = useHistory();
  const emptyPost = {
    title: "",
    body: "",
    price: "",
  };
  const [listing, setListing] = useState(emptyPost);
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const listingCopy = { ...listing };

    listingCopy[key] = value;
    setListing(listingCopy);
  };
  const handleSave = (evt) => {
    evt.preventDefault();
    addListing(listing).then((p) => {
      history.push("/marketplace");
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
  );
};
export default ListingForm;
