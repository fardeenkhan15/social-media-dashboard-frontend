import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MetricsCard = ({ title, value, category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleUpdate = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">
          {category}
        </Typography>
        {isEditing ? (
          <>
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              type="number"
              fullWidth
              margin="normal"
            />
            <Button onClick={handleUpdate}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;