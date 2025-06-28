import React, { useEffect, useState } from 'react';
import './PropertyListings.css';

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties/all');
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="listing-page">
      <h2>Available Properties</h2>
      <div className="listing-grid">
        {properties.map((prop) => (
          <div key={prop._id} className="listing-card">
            {prop.images?.length > 0 && (
              <img src={prop.images[0]} alt="property" className="property-image" />
            )}
            <h3>{prop.title}</h3>
            <p>{prop.description}</p>
            <p><strong>Type:</strong> {prop.type}</p>
            <p><strong>Price:</strong> GHS {prop.price}</p>
            <p><strong>Location:</strong> {prop.location}</p>
            <p><strong>Rooms:</strong> {prop.roomsAvailable}/{prop.roomsTotal}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
