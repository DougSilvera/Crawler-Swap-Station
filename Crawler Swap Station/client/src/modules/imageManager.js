const _apiUrl = "api.cloudinary.com/v1_1/decr56t4k/image/upload"

export const uploadImage = (data) => {
    return fetch(_apiUrl, {
        method: "POST",
        body: data,
    }).then((resp)) 
}