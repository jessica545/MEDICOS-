import React, { useState, useEffect } from 'react';
import ProfileEdit from './ProfileEdit';
import '../styles/profile.css'; // Import the CSS file

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profileData'));
    if (storedProfile) {
      setProfileData(storedProfile);
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedData) => {
    // Save updated profile data to localStorage
    localStorage.setItem('profileData', JSON.stringify(updatedData));
    setProfileData(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {isEditing ? (
        // When editing, show the ProfileEdit component
        <ProfileEdit initialData={profileData} onSave={handleSaveProfile} />
      ) : (
        <div className="profile-details">
          <p><strong>Name:</strong> {profileData.name || "Not provided"}</p>
          <p><strong>Email:</strong> {profileData.email || "Not provided"}</p>
          <p><strong>Phone:</strong> {profileData.phone || "Not provided"}</p>
          <p><strong>Bio:</strong> {profileData.bio || "Tell us about yourself"}</p>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;