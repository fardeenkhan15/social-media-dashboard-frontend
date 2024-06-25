import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserDetails, updateUserDetails, uploadProfilePic } from '../api/api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      setUser(response.data);
      setFullName(response.data.fullName);
      if (response.data.dateOfBirth) {
        const date = new Date(response.data.dateOfBirth);
        setDateOfBirth(date.toISOString().split('T')[0]);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails({ fullName, dateOfBirth });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profilePic', file);
        const response = await uploadProfilePic(formData);
        console.log('Upload response:', response);
        setUser(prevUser => ({ ...prevUser, profilePic: response.data.profilePic }));
        toast.success('Profile picture uploaded successfully');
      } catch (error) {
        toast.error('Error uploading profile picture');
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      <Avatar
        src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : ''}
        alt={user.username}
        sx={{ width: 100, height: 100, margin: '0 auto 20px' }}
      />
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Date of Birth"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleProfilePicUpload}
          />
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Update Profile
        </Button>
      </form>
      <Button
        component={Link}
        to="/dashboard"
        variant="outlined"
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default UserProfile;
