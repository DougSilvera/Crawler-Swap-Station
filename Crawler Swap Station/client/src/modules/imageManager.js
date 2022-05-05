import { getToken } from "./authManager"
const _apiUrlCloud = "https://api.cloudinary.com/v1_1/decr56t4k/image/upload"
const _apiUrl = "/api/Image"


export const uploadImageToCloudinary = (data) => {
    return fetch(_apiUrlCloud, {
        method: "POST",
        body: data,
    }) 
}

export const addImageCssDb = (imageInfo) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageInfo)
      }).then((resp) => {
        if (resp.ok) {
          return resp.ok;
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new Image."
          );
        }
      });
    });
  };