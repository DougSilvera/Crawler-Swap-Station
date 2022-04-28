import { getToken } from "./authManager"
const _apiUrl = "/api/Favorite"

export const addFavorite = (listingId) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/${listingId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.ok;
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
  export const deleteFavorite = (id) => {
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
          throw new Error("An error occurred deleting favorite");
        }
      });
    });
  };
