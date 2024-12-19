import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { 
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop, 
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropModal.css'
import setCanvasPreview from './setCanvasPreview';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

function ImageCropModal({ onClose, onCropComplete,selectedImage }) {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [aspect, setAspect] = useState(1); // 1:1 aspect ratio

  // File selection handler
  // const handleFileChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if(!file)return;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       setSelectedImage(reader.result);
  //     });
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Image load handler
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const croppedWidthInPercent = (MIN_DIMENSION/width) * 100; //this will ensure our crop width will always be min 150px
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: croppedWidthInPercent
      }, ASPECT_RATIO,
      width,
      height
    )
    
    // Set initial crop
    // const initialCrop = centerAspectCrop(width, height, aspect);
    const centeredCrop = centerCrop(crop,width,height)
    setCrop(centeredCrop);
  };

  // function circularCrop(image, canvas, crop) {
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;

  //   const scaleX = image.naturalWidth / image.width;
  //   const scaleY = image.naturalHeight / image.height;

  //   canvas.width = crop.width;
  //   canvas.height = crop.height;

  //   // Create circular clipping path
  //   ctx.beginPath();
  //   ctx.arc(
  //     canvas.width / 2, 
  //     canvas.height / 2, 
  //     canvas.width / 2, 
  //     0, 
  //     Math.PI * 2
  //   );
  //   ctx.closePath();
  //   ctx.clip();

  //   // Draw the image
  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width,
  //     crop.height
  //   );
  // }

  // Generate cropped image
  // const getCroppedImage = async () => {
  //   if (!previewCanvasRef.current) {
  //     console.error('Preview canvas not available');
  //     return null;
  //   }

  //   return new Promise((resolve) => {
  //     previewCanvasRef.current.toBlob((blob) => {
  //       if (!blob) {
  //         console.error('Failed to create blob');
  //         resolve(null);
  //         return;
  //       }
  //       const croppedImageUrl = URL.createObjectURL(blob);
  //       resolve(croppedImageUrl);
  //     }, 'image/jpeg');
  //   });
  // };

  // useEffect(() => {
  //   if (completedCrop && imgRef.current && previewCanvasRef.current) {
  //     circularCrop(imgRef.current, previewCanvasRef.current, completedCrop);
  //   }
  // }, [completedCrop]);

  // Handle upload click
  const handleUploadClick = async () => {
    //const croppedImage = await getCroppedImage();
    // if (croppedImage) {
    //   onCropComplete(croppedImage);
    //   onClose();
    // } else {
    //   console.error('Failed to crop image');
    // }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 20,
          borderRadius: 10,
          width: '90%',
          maxWidth: 500,
          maxHeight: '90%',
          overflow: 'auto',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ marginBottom: '10px', textAlign: "center", flex: 1 }}>
            Update Profile Picture
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              textAlign: "center"
            }}
          >
            ×
          </button>
        </div>

        {/* <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        /> */}

        {selectedImage && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              //onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={true}
              minWidth={150}
              // maxWidth={150}
              // disabled={true}
              keepSelection
            >
              <img
                ref={imgRef}
                src={selectedImage}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ maxHeight:"70vh",maxWidth: '100%' }}
              />
            </ReactCrop>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
              <button
                style={{ marginRight: 10 }}
                onClick={() => {
                  setCanvasPreview(
                    imgRef.current, // HTMLImageElement
                    previewCanvasRef.current, // HTMLCanvasElement
                    convertToPixelCrop(
                      crop,
                      imgRef.current.width,
                      imgRef.current.height
                    )
                  );
                  const dataUrl = previewCanvasRef.current.toDataURL();
                  onCropComplete(dataUrl);
                  onClose();
                }}
              >
                Upload
              </button>
              {/* <button onClick={onClose}>Cancel</button> */}
            </div>

            {crop && (
              <div style={{ marginTop: '10px' }}>
                {/* <h4>Preview</h4> */}
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    display:"none",
                    maxWidth: '100%',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            )}
          </>
        )}

        {/* <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <button 
            onClick={handleUploadClick} 
            disabled={!completedCrop}
            style={{ marginRight: 10 }}
          >
            Upload
          </button>
          <button onClick={onClose}>Cancel</button>
        </div> */}
      </div>
    </div>
  );
}

export default ImageCropModal;