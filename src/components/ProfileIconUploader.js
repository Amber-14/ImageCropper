import React, { useRef, useState } from 'react';
import ImageCropModal from './ImageCropModal';

const ProfileIconUploader = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  

  const fileInputRef = useRef()

  const handleUpdateClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if(!file)return;
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSelectedImage(reader.result);
        setIsModalOpen(true);
        console.log("isModal",isModalOpen)
      });
      reader.readAsDataURL(file);
      //setSelectedImage(null); 
    }
  };


  const handleCropComplete = (croppedImage) => {
    console.log("croppedImg",croppedImage);
    setProfileImage(croppedImage);
    setIsModalOpen(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
      
        style={{ position: 'relative',display: 'inline-block',
          width: 150,
          height: 150,
          borderRadius: '50%',
          overflow: 'hidden' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleUpdateClick}>

        {/* Profile Image Display */}
        {/* <img
          src={profileImage || 'https://qa.merchantsupportcenter.net/assets/img/avatar.png'} // Use a default avatar
          alt="Profile"
          style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
        /> */}
        <img
          src={profileImage || 'https://qa.merchantsupportcenter.net/assets/img/avatar.png'}
          alt="Profile"
          style={{ 
            width: 150, 
            height: 150, 
            borderRadius: '50%', 
            objectFit: 'cover',
            cursor: 'pointer'
          }}
        />
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer'
          }}>
            <span>CHANGE &nbsp; PROFILE PHOTO</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>


      {/* <button onClick={handleUpdateClick}>Update Profile
      <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px',display:"none" }}
        />
      </button> */}

      {/* Modal for Cropping */}
      {isModalOpen && (
      //   <ImageCropModall 
      //   onClose={() => setIsModalOpen(false)}
      //   onCropComplete={handleCropComplete}
      // />
        <ImageCropModal
          onClose={() => setIsModalOpen(false)}
          onCropComplete={handleCropComplete}
          selectedImage = {selectedImage}
        />
      )}
    </div>
  );
};

export default ProfileIconUploader;
