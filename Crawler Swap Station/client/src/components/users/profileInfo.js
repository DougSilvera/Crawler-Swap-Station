import React, { useEffect, useState } from "react";
import { getLoggedInUserProfile } from "../../modules/authManager";
import {
  getAllUserListings,
  getLoggedInUserFavoriteListings,
} from "../../modules/listingManager";

const profileInfo = () => {
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
  });
};
export default profileInfo;
