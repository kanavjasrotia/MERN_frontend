import { Col, Card } from "react-bootstrap";
import { IImage } from "../../core/interface/IImage";

function ImagesGallery({
  images,
  setImages,
}: {
  images: IImage[];
  setImages: Function;
}) {
  const handleImageClick = (index: number) => {
    // Create a new array without the clicked image
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="row">
      {images.map((image, index) => {
        return (
          <Col key={index} sm={2} onClick={() => handleImageClick(index)}>
            <Card>
              <img src={image.url} alt={`Image ${index + 1}`} />
            </Card>
          </Col>
        );
      })}
    </div>
  );
}

export default ImagesGallery;
