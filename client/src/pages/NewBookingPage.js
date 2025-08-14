// client/src/pages/NewBookingPage.js --- FINAL CORRECTED VERSION
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSlots, createBooking, reset } from '../features/bookings/bookingSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Typography, CircularProgress, Box, Alert, Button, TextField,
  Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

// Using your custom item prices
const ITEM_PRICES = {
  trolley: 200,
  mattress: 100,
  bucket: 50,
};

function NewBookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // We only need the state related to displaying the form
  const { slots, isLoading, isError, message } = useSelector(
    (state) => state.bookings
  );

  const [items, setItems] = useState({ trolley: 0, mattress: 0, bucket: 0 });
  const [pickupSlot, setPickupSlot] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // This effect fetches slots and resets state on unmount
  useEffect(() => {
    dispatch(getSlots());
    return () => {
        dispatch(reset());
    }
  }, [dispatch]);

  // This effect calculates the price
  useEffect(() => {
    const newTotalPrice = Object.keys(items).reduce((sum, key) => {
      return sum + items[key] * (ITEM_PRICES[key] || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [items]);

  const handleItemChange = (e) => {
    setItems({
      ...items,
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };

  // This is the single, reliable way to handle the form submission and redirect
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupSlot || totalPrice === 0) {
      alert('Please select at least one item and a pickup slot.');
      return;
    }
    const bookingData = {
      items: Object.keys(items)
        .filter(key => items[key] > 0)
        .map(key => ({ type: key, quantity: items[key] })),
      totalPrice,
      pickupSlot,
    };

    try {
      // Dispatch the action and wait for it to complete
      const resultAction = await dispatch(createBooking(bookingData));
      // unwrapResult will give us the successful payload or throw an error
      const newBooking = unwrapResult(resultAction);
      
      // If we get here, it was a success. Now we can safely redirect.
      navigate(`/payment/${newBooking._id}`);

    } catch (err) {
      // If unwrapResult throws an error, we catch it and show the message
      alert(err.message || 'Failed to create booking');
    }
  };

  if (isLoading && slots.length === 0) {
    return <CircularProgress />;
  }

  return (
      <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>Create a New Booking</Typography>
          {isError && !isLoading && <Alert severity="error">{message}</Alert>}
          
          <Typography variant="h6" sx={{ mt: 2 }}>Select Your Items</Typography>
          <TextField label="Trolleys" type="number" name="trolley" value={items.trolley} onChange={handleItemChange} fullWidth margin="normal" inputProps={{ min: 0 }} />
          <TextField label="Mattresses" type="number" name="mattress" value={items.mattress} onChange={handleItemChange} fullWidth margin="normal" inputProps={{ min: 0 }} />
          <TextField label="Buckets" type="number" name="bucket" value={items.bucket} onChange={handleItemChange} fullWidth margin="normal" inputProps={{ min: 0 }} />

          <Typography variant="h6" sx={{ mt: 2 }}>Choose a Pickup Slot</Typography>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="slot-select-label">Pickup Slot</InputLabel>
            <Select
              labelId="slot-select-label"
              value={pickupSlot}
              label="Pickup Slot"
              onChange={(e) => setPickupSlot(e.target.value)}
            >
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <MenuItem key={slot._id} value={slot._id}>
                    {`${new Date(slot.startTime).toLocaleString('en-IN')} - ${new Date(slot.endTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No available slots</MenuItem>
              )}
            </Select>
          </FormControl>

          <Typography variant="h5" sx={{ mt: 3 }}>Total Price: ₹{totalPrice}</Typography>

          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }} disabled={isLoading}>
            {isLoading ? 'Confirming...' : 'Confirm Booking'}
          </Button>
      </Box>
  );
}

export default NewBookingPage;