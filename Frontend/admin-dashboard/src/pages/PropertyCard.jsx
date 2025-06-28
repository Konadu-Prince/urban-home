import React, { useState } from 'react';
import MessageModal from './MessageModal';

function PropertyCard({ property }) {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [likes, setLikes] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLike = () => setLikes(likes + 1);

  return (
    <div className="property-card">
      <div className="media-carousel">
        <img
          src={property.images[currentMedia]}
          alt="property media"
          className="media"
          onClick={() => setCurrentMedia((currentMedia + 1) % property.images.length)}
        />
      </div>

      <div className="property-info">
        <h3>{property.title}</h3>
        <p>{property.location}</p>
        <p>${property.price}</p>
        <div className="actions">
          <span onClick={handleLike}>❤️ {likes}</span>
          <span>💬 0</span>
          <button onClick={() => setModalOpen(true)}>Message Owner</button>
        </div>
      </div>

      {modalOpen && <MessageModal onClose={() => setModalOpen(false)} ownerId={property.ownerId} />}
    </div>
  );
}

export default PropertyCard;
