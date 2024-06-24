import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemIcon, Icon, Avatar } from '@mui/material';
import MetricsCard from '../components/MetricsCard';
import TrendsChart from '../components/TrendsChart';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import SummarySection from '../components/SummarySection';
import { getMetrics, addMetric, updateMetric, deleteMetric, getUserDetails } from '../api';
import { Link } from 'react-router-dom';

const DashboardPage = ({ username }) => {
  const [metrics, setMetrics] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    fetchMetrics();
    fetchUserDetails();
  }, []);

  const predefinedMetrics = [
    { id: 'followers', name: 'Followers', category: 'Audience', icon: 'group' },
    { id: 'likes', name: 'Likes', category: 'Engagement', icon: 'thumb_up' },
    { id: 'comments', name: 'Comments', category: 'Engagement', icon: 'comment' },
    { id: 'shares', name: 'Shares', category: 'Engagement', icon: 'share' },
    { id: 'impressions', name: 'Impressions', category: 'Reach', icon: 'visibility' },
    { id: 'clicks', name: 'Clicks', category: 'Traffic', icon: 'touch_app' },
    { id: 'videoViews', name: 'Video Views', category: 'Content', icon: 'videocam' },
    { id: 'mentions', name: 'Brand Mentions', category: 'Brand', icon: 'chat' },
  ];

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      setUserProfilePic(response.data.profilePic ? `http://localhost:5000/${response.data.profilePic}` : '');
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await getMetrics();
      setMetrics(response.data);
      calculateTrends(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const calculateTrends = (metricsData) => {
    const trendData = metricsData.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = {
          total: 0,
          previous: 0,
          change: 0,
        };
      }
      const previousValue = acc[metric.category].total;
      acc[metric.category].total += parseInt(metric.value, 10);
      acc[metric.category].previous = previousValue;
      acc[metric.category].change = acc[metric.category].total - previousValue;
      return acc;
    }, {});

    const trendsArray = Object.entries(trendData).map(([category, data]) => ({
      category,
      ...data,
    }));

    setTrendsData(trendsArray);
  };

  const handleAddMetric = async (metricId) => {
    try {
      const metricToAdd = predefinedMetrics.find((m) => m.id === metricId);
      const token = localStorage.getItem('token');
      const response = await addMetric(
        {
          title: metricToAdd.name,
          value: '0',
          category: metricToAdd.category,
        },
        token
      );
      setMetrics([...metrics, response.data]);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding metric:', error);
    }
  };

  const handleUpdateMetric = async (id, newValue) => {
    try {
      const token = localStorage.getItem('token');
      const response = await updateMetric(id, { value: newValue }, token);
      const updatedMetrics = metrics.map((metric) =>
        metric._id === id ? { ...metric, value: response.data.value } : metric
      );
      setMetrics(updatedMetrics);
      calculateTrends(updatedMetrics);
    } catch (error) {
      console.error('Error updating metric:', error);
    }
  };

  const handleDeleteMetric = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteMetric(id, token);
      const updatedMetrics = metrics.filter((metric) => metric._id !== id);
      setMetrics(updatedMetrics);
      calculateTrends(updatedMetrics);
    } catch (error) {
      console.error('Error deleting metric:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            {username}'s Social Media Dashboard
          </Typography>
          <Avatar
            src={userProfilePic}
            alt="User Profile Picture"
            sx={{ width: 100, height: 100, margin: '20px auto' }}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/profile"
          >
            View/Edit Profile
          </Button>
        </Grid>
        <Grid item xs={12}>
          <SummarySection metrics={metrics} />
        </Grid>

        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric._id}>
            <MetricsCard
              title={metric.title}
              value={metric.value}
              category={metric.category}
              onUpdate={(newValue) => handleUpdateMetric(metric._id, newValue)}
              onDelete={() => handleDeleteMetric(metric._id)}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Add Metric
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bar Chart
            </Typography>
            <BarChartComponent data={trendsData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pie Chart
            </Typography>
            <PieChartComponent data={trendsData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Trends
            </Typography>
            <TrendsChart data={trendsData} />
          </Paper>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add Metric</DialogTitle>
          <DialogContent>
            <List>
              {predefinedMetrics.map((metric) => (
                <ListItem button key={metric.id} onClick={() => handleAddMetric(metric.id)}>
                  <ListItemIcon>
                    <Icon>{metric.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={metric.name} secondary={metric.category} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default DashboardPage;
