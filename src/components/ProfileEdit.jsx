import React, { useState, useEffect } from 'react';

function ProfileEdit({ initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    bio: initialData.bio || ''
  });

  // Update formData when initialData changes (i.e., when the profileData in the parent changes)
  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      bio: initialData.bio || ''
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated formData back to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default ProfileEdit;