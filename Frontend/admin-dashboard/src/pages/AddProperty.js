import React, { useState } from 'react';
import './AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'rent',
    price: '',
    location: '',
    roomsTotal: '',
    roomsAvailable: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, images: [...e.target.files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/properties/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.message || 'Property submitted!');
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <div className="property-form-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input type="number" name="roomsTotal" value={formData.roomsTotal} onChange={handleChange} placeholder="Total Rooms" />
        <input type="number" name="roomsAvailable" value={formData.roomsAvailable} onChange={handleChange} placeholder="Rooms Available" />
        
        <input type="file" multiple onChange={handleFileChange} accept="image/*" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;
