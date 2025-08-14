import React from 'react';
import { useDispatch } from 'react-redux';
import { updateBookingStatus } from '../../features/admin/adminSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Typography, Box } from '@mui/material';

function BookingList({ bookings }) {
    const dispatch = useDispatch();

    const handleStatusChange = (bookingId, newStatus) => {
        dispatch(updateBookingStatus({ bookingId, status: newStatus }));
    };

    const statusOptions = ['Pending Payment', 'Pending Confirmation', 'Confirmed', 'In Storage', 'Out for Delivery', 'Delivered', 'Cancelled'];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Booking ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Transaction Details</TableCell> {/* <-- NEW COLUMN HEADER */}
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking._id}>
                            <TableCell>{booking._id}</TableCell>
                            <TableCell>{booking.user ? booking.user.name : 'N/A'}<br/>{booking.user ? booking.user.email : ''}</TableCell>
                            <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>₹{booking.totalPrice}</TableCell>
                            
                            {/* --- NEW COLUMN DATA --- */}
                            <TableCell>
                                {booking.paymentDetails && booking.paymentDetails.paymentId ? (
                                    <Box>
                                        <Typography variant="body2">Method: {booking.paymentDetails.method}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            ID: {booking.paymentDetails.paymentId}
                                        </Typography>
                                    </Box>
                                ) : (
                                    'N/A'
                                )}
                            </TableCell>
                            {/* --- END OF NEW COLUMN --- */}
                            
                            <TableCell>
                                <Select
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    sx={{ width: '100%', minWidth: '180px' }}
                                >
                                    {statusOptions.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BookingList;