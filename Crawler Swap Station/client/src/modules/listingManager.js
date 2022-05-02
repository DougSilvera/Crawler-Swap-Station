import { getToken } from "./authManager";
const _apiUrl = "/api/Listing";

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
export const getShortListingById = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/listingShort/${id}`, {
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
export const updateListing = (listing) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${listing.id}`, {
      method: "PUT",
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
          "An unknown error occurred while trying to save changes to listing."
        );
      }
    });
  });
};
export const deleteListing = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.ok;
      } else {
        throw new Error("An error occurred deleting listing");
      }
    });
  });
};
export const SearchListings = (query) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/search?q=${query}`, {
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
export const getUserFavoriteListing = (listingId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/favorites/${listingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        if (resp.status === 200) {
          return resp.json();
        } else if (resp.status === 204) {
          return [];
        }
      } else {
        throw new Error("An error occurred retrieving user favorites");
      }
    });
  });
};
export const getAllUserListings = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/getUserListings}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 204) {
        return [];
      } else {
        throw new Error("An error occurred retrieving listings");
      }
    });
  });
};
export const getLoggedInUserFavoriteListings = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/userFavoriteListings}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 204) {
        return [];
      } else {
        throw new Error("An error occurred retrieving listings");
      }
    });
  });
};