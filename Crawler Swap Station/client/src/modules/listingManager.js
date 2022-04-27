import { getToken } from "./authManager"
const _apiUrl = "/api/Listing"

export const getAllListings = () => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An error occurred retrieving listings");
        }
      });
    });
  };

  export const getListingById = (id) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An error occurred retrieving listing");
        }
      });
    });
  };
  export const addListing = (listing) => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new listing."
          );
        }
      });
    });
  };
  