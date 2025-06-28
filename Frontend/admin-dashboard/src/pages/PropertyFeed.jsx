import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import './PropertyFeed.css';

function PropertyFeed() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('/api/properties/all')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="feed-container">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}

export default PropertyFeed;
