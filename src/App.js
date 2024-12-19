import React from 'react';
import ProfileIconUploader from './components/ProfileIconUploader';
import 'react-image-crop/dist/ReactCrop.css'

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{textAlign:"center"}}>Profile Icon Uploader</h2>
      <ProfileIconUploader />
    </div>
  );
};

export default App;
