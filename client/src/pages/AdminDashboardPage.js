import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookings, getSlots } from '../features/admin/adminSlice';
import BookingList from '../components/admin/BookingList';
import SlotManager from '../components/admin/SlotManager';
import { Typography, Box, CircularProgress, Alert, Tabs, Tab } from '@mui/material';

function AdminDashboardPage() {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0); // 0 for Bookings, 1 for Slots

    const { bookings, slots, isLoading, isError, message } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllBookings());
        dispatch(getSlots());
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Manage Bookings" />
                    <Tab label="Manage Slots" />
                </Tabs>
            </Box>

            {isLoading && <CircularProgress />}
            {isError && <Alert severity="error">{message}</Alert>}

            {/* Tab Panel for Bookings */}
            {tab === 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>All User Bookings</Typography>
                    <BookingList bookings={bookings} />
                </Box>
            )}

            {/* Tab Panel for Slots */}
            {tab === 1 && (
                <Box>
                    <SlotManager slots={slots} />
                </Box>
            )}
        </Box>
    );
}

export default AdminDashboardPage;