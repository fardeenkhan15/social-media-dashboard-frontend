import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const SummarySection = ({ metrics }) => {
  const totalValue = metrics.reduce((sum, metric) => sum + parseInt(metric.value, 10), 0);
  const averageValue = metrics.length > 0 ? totalValue / metrics.length : 0;
  const trend = metrics.length > 1 ? 
    (parseInt(metrics[metrics.length - 1].value, 10) > parseInt(metrics[metrics.length - 2].value, 10) ? 'up' : 'down') : 'neutral';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h4">{totalValue}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Average</Typography>
          <Typography variant="h4">{averageValue.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Trend</Typography>
          <Typography variant="h4">
            {trend === 'up' ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
          </Typography>
        </Paper>
      </Grid>
    </Grid> 
  );
};

export default SummarySection;