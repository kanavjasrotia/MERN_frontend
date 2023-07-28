import React, { useState } from "react";

import ImagesGallery from "./ImageGallery";
import { IImage } from "../../core/interface/IImage";
import { notify } from "../../utils/toast";
import FeatureFields from "./FeatureFields";
import { IProductFeature } from "../../core/interface/IProductFeature";

const AddProduct: React.FC = () => {
  const [images, setImages] = useState<Array<IImage>>([]);

  const [featureValues, setFeatureValues] = useState<Array<IProductFeature>>([
    { feature: "", value: "" },
  ]);

  const handleMultipleImages = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: IImage[] = [];
    //GET FILELIST FROM EVENT ELEMENT
    const targetFiles = evnt.target.files;

    //convert targetFiles obj to array
    const targetFilesObject = Array.from(targetFiles || []);

    //For each file index in array
    targetFilesObject.forEach((file) => {
      //Create the url for the file
      const imageUrl = URL.createObjectURL(file);

      // Check if an image with the same name already exists
      const isDuplicate = images.some((image) => image.name === file.name);

      if (!isDuplicate) {
        //If im age with same name doesnot exist push it
        selectedFiles.push({
          name: file.name,
          url: imageUrl,
        });
      } else if (isDuplicate) {
        //if image with same name prop exists notify user
        notify("this image is already selected", "error");
      }
    });

    // Limit the new images array to the remaining space (maximum 6)
    const newImages = [...images, ...selectedFiles].slice(0, 6);
    setImages(newImages);
  };

  return (
    <React.Fragment>
      <div className="mt-2">
        <p>Add a new product</p>
        <form className="mt-2 ">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleMultipleImages}
            disabled={images.length >= 6} // Disabled when 6 images are selected
            multiple
          />
          <ImagesGallery images={images} setImages={setImages} />
          <input
            type="text"
            name="title"
            className={`form-control form-control-md w-25 `}
            placeholder="title"
            required
          />

          <input
            type="text"
            name="price"
            className={`form-control form-control-md w-25 `}
            placeholder="price in rupees"
            required
          />
          <p>Product features</p>
          <FeatureFields
            featureValues={featureValues}
            setFeatureValues={setFeatureValues}
          />

          <button type="submit">Add product</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
