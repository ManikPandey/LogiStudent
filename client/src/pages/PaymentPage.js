// client/src/pages/PaymentPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button, CircularProgress, Alert } from '@mui/material';
import qrCodeImage from '../assets/my-qr-code.png'; // <-- Import your QR code image
// We will create the submitPaymentDetails action next
import { submitPaymentDetails, reset } from '../features/bookings/bookingSlice';

function PaymentPage() {
    const { id: bookingId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [transactionId, setTransactionId] = useState('');
    const { bookings, isLoading, isError, message } = useSelector((state) => state.bookings);
    const booking = bookings.find(b => b._id === bookingId);

    useEffect(() => {
        // This will run when the payment submission is successful
        if (!isLoading && !isError && message === 'payment_submitted') {
            navigate('/dashboard');
        }
        return () => {
            dispatch(reset());
        }
    }, [isLoading, isError, message, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!transactionId) {
            return alert('Please enter your Transaction ID');
        }
        dispatch(submitPaymentDetails({ bookingId, transactionId }));
    };

    if (!booking) {
        return <Typography>Booking not found. Please go to your dashboard.</Typography>;
    }

    return (
        <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom align="center">Complete Your Payment</Typography>
            <Typography variant="h6" align="center">Order Total: ₹{booking.totalPrice}</Typography>
            <hr />
            <Box sx={{ my: 3, textAlign: 'center' }}>
                <Typography variant="h6">Scan QR Code to Pay</Typography>
                <img src={qrCodeImage} alt="UPI QR Code" style={{ maxWidth: '250px', margin: '16px auto' }} />
                <Typography>OR</Typography>
                <Typography>Pay to UPI ID: **your-upi-id@okhdfcbank**</Typography>
            </Box>
            <hr />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Enter Payment Confirmation Details</Typography>
                <TextField
                    label="UPI Transaction ID / UTR Number"
                    fullWidth
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    margin="normal"
                    helperText="After paying, enter the 12-digit transaction ID from your UPI app."
                />
                {isError && <Alert severity="error">{message}</Alert>}
                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Confirm Payment'}
                </Button>
            </Box>
        </Paper>
    );
}

export default PaymentPage;