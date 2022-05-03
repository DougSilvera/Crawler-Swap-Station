import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Table, Card, CardBody, CardHeader } from "reactstrap";
import { getLoggedInUserProfile } from "../../modules/authManager";
import {
  getAllUserListings,
  getLoggedInUserFavoriteListings,
} from "../../modules/listingManager";

const ProfileInfo = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [userFavoriteListings, setUserFavoriteListings] = useState([]);

  const getUser = () => {
    getLoggedInUserProfile().then((d) => setUserProfile(d));
  };
  const getUserListings = () => {
    getAllUserListings().then((d) => setUserListings(d));
  };
  const getUserFavoritelistingArray = () => {
    getLoggedInUserFavoriteListings().then((d) => setUserFavoriteListings(d));
  };
  useEffect(() => {
    getUser();
    getUserListings();
    getUserFavoritelistingArray();
  }, []);
  return (
    <div>
        <div className="profileTopRow">

      <Card className="text-center">
        <CardHeader>My Details</CardHeader>
        <CardBody>
          <ListGroup>
              <ListGroupItem>Name: {userProfile.firstName}{" "}{userProfile.lastName}</ListGroupItem>
              <ListGroupItem>{userProfile.displayName}</ListGroupItem>
              <ListGroupItem>{userProfile.email}</ListGroupItem>
              <ListGroupItem>{userProfile.phone}</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
      <Card>
          <CardHeader>My Listings</CardHeader>
          <CardBody>
             <Table>
                 <thead>
                     <tr>
                         <th>
                             #
                         </th>
                         <th>
                             Listing Title
                         </th>
                         <th>
                             Listing Price
                         </th>
                         <th>
                             Date Listed
                         </th>
                
                     </tr>
                 </thead>
                 <tbody>
                     {userListings.map((listing, i) => {
                         return <tr key={`${listing.id}`}>
                             <th scope="row">{i+1}</th>
                             <td><Link to={`/marketplace/listingDetail/${listing.id}`}>{listing.title}</Link></td>
                             <td>$ {listing.price}</td>
                             <td>{listing.dateCreated}</td>
                         </tr>
                     })}
                 </tbody>
             </Table> 
          </CardBody>
      </Card>    
        </div>
      <Card style={{margin: 25}}>
          <CardHeader>My Favorites</CardHeader>
          <CardBody>
             <Table>
                 <thead>
                     <tr>
                         <th>
                             #
                         </th>
                         <th>
                             Listing Title
                         </th>
                         <th>
                             Listed by User
                         </th>
                         <th>
                             Listing Price
                         </th>
                         <th>
                             Date Listed
                         </th>
                
                     </tr>
                 </thead>
                 <tbody>
                     {userFavoriteListings.map((listing, i) => {
                         return <tr key={`${listing.id}`}>
                             <th scope="row">{i+1}</th>
                             <td><Link to={`/marketplace/listingDetail/${listing.id}`}>{listing.title}</Link></td>
                             <td>{listing.userProfile?.displayName}</td>
                             <td>$ {listing.price}</td>
                             <td>{listing.dateCreated}</td>
                         </tr>
                     })}
                 </tbody>
             </Table> 
          </CardBody>
      </Card>    
    </div>
  );
};
export default ProfileInfo;