import React, { useState } from 'react';
import './PropertyGallery.css';

const sampleImages = [
  '/uploads/sample1.jpg',
  '/uploads/sample2.jpg',
  '/uploads/sample3.jpg',
  '/uploads/sample4.jpg',
];

const PropertyGallery = () => {
  const [preview, setPreview] = useState(null);

  return (
    <div className="gallery-container">
      <h2>Property Gallery</h2>
      <div className="image-grid">
        {sampleImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`property-${i}`}
            onClick={() => setPreview(img)}
            className="thumbnail"
          />
        ))}
      </div>

      {/* Full-screen preview */}
      {preview && (
        <div className="preview-overlay" onClick={() => setPreview(null)}>
          <img src={preview} alt="Preview" className="preview-img" />
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
