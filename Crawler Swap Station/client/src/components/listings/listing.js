import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Listing = ({listing}) => {
    return (
        <Card style={{height:200}} key={listing.id}>
            <CardBody>
                <CardTitle><Link to={`/marketplace/listingDetail/${listing.id}`}>{listing.title}</Link></CardTitle>
                <CardSubtitle>${listing.price}</CardSubtitle>
                <CardText numberOfLines={3}>{listing.body}</CardText>
            </CardBody>
        </Card>
    )
}
export default Listing