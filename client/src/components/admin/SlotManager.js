import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSlot, deleteSlot } from '../../features/admin/adminSlice';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SlotManager({ slots }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        startTime: '',
        endTime: '',
        capacity: '',
    });

    const { startTime, endTime, capacity } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createSlot({ startTime, endTime, capacity: Number(capacity) }));
        setFormData({ startTime: '', endTime: '', capacity: '' }); // Clear form
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Create New Slot</Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                <TextField label="Start Time" name="startTime" type="datetime-local" value={startTime} onChange={onChange} InputLabelProps={{ shrink: true }} required />
                <TextField label="End Time" name="endTime" type="datetime-local" value={endTime} onChange={onChange} InputLabelProps={{ shrink: true }} required />
                <TextField label="Capacity" name="capacity" type="number" value={capacity} onChange={onChange} required />
                <Button type="submit" variant="contained">Create</Button>
            </Box>

            <Typography variant="h6" gutterBottom>Existing Slots</Typography>
            <List>
                {slots.map((slot) => (
                    <ListItem key={slot._id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteSlot(slot._id))}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText 
                            primary={`From: ${new Date(slot.startTime).toLocaleString()} - To: ${new Date(slot.endTime).toLocaleString()}`}
                            secondary={`Capacity: ${slot.bookingsCount} / ${slot.capacity}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SlotManager;