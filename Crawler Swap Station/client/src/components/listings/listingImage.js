import React from "react";
import { Input } from "reactstrap";

const ImageUploader = ({uploadImage}) => {
    return (
        <div>
            <input type="file" name="file" placeholder="Upload an Image" onChange={(e) => uploadImage(e)}/>
        </div>
    )
}
export default ImageUploader;