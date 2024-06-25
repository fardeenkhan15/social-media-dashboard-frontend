import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserDetails, updateUserDetails, uploadProfilePic } from '../api/api';

const API_URL = 'https://social-media-dashboard-backend-1.onrender.com';

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
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      <Avatar
        src={user.profilePic ? `${API_URL}/${user.profilePic}` : ''}        
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
        <Box mt={3}>
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfilePicUpload}
            />
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Update Profile
          </Button>
        </Box>
      </form>
      <Box mt={3} mb={2}>
        <Button
          component={Link}
          to="/dashboard"
          variant="outlined"
          fullWidth
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
