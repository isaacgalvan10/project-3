import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Button } from 'react-bootstrap';

export default function ProfileImg() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
    localStorage.setItem('profileImg', JSON.stringify(imageList[0].data_url));
  };

  return (
    <div className="App">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click to upload image
            </Button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  src={image['data_url']}
                  alt=""
                  width="100"
                  style={{ marginTop: '10px', marginBottom: '10px' }}
                />
                <div className="image-item__btn-wrapper">
                  <Button
                    onClick={() => onImageUpdate(index)}
                    style={{ marginRight: '10px' }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
