import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMyBookings, reset } from '../features/bookings/bookingSlice';
import { Typography, CircularProgress, Box, Alert, Button } from '@mui/material'; 

function DashboardPage() {
    const dispatch = useDispatch();
    const { bookings, isLoading, isError, message } = useSelector((state) => state.bookings);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Fetch bookings when the component loads
        dispatch(getMyBookings());

        // Reset the booking state when the component unmounts
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Welcome, {user && user.name}</Typography>
            <Button component={Link} to="/new-booking" variant="contained" color="primary" sx={{ my: 2 }}>
                Book New Storage
            </Button>
            <Typography variant="h5">Your Bookings</Typography>
            {isError && <Alert severity="error">{message}</Alert>}

            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    // We will make a proper BookingItem component later
                    <Box key={booking._id} sx={{ p: 2, border: '1px solid grey', my: 1 }}>
                        <Typography>Booking ID: {booking._id}</Typography>
                        <Typography>Status: {booking.status}</Typography>
                        <Typography>Total Price: ₹{booking.totalPrice}</Typography>
                    </Box>
                ))
            ) : (
                <Typography>You have no bookings yet.</Typography>
            )}
        </Box>
    );
}

export default DashboardPage;