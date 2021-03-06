import React from "react";

const ImageUploader = ({ uploadImage }) => {
  return (
    <div className="imageLoader">
      <input
        type="file"
        name="file"
        placeholder="Upload an Image"
        onChange={(e) => uploadImage(e)}
      />
    </div>
  );
};
export default ImageUploader;
