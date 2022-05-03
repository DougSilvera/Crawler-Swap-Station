import { useState } from "react";
import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { SearchListings } from "../../modules/listingManager";

const ListingSearch = ({setListings}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (evt) => {
    let queryCopy = { ...query };
    queryCopy = evt.target.value;
    setQuery(queryCopy);
  };
  const handleSearch = (evt) => {
    evt.preventDefault();
    SearchListings(query).then((d) => setListings(d));
  };
  return (
    <FormGroup>
      <Input placeholder="search here" onChange={handleInputChange} />
      <Button onClick={handleSearch}>Search</Button>
    </FormGroup>
  );
};
export default ListingSearch;
