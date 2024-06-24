import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '@mui/material/styles';

const TrendsChartComponent = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke={theme.palette.primary.main} />
        <Line type="monotone" dataKey="previous" stroke={theme.palette.secondary.main} />
        <Line type="monotone" dataKey="change" stroke={theme.palette.error.main} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendsChartComponent;