import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from './bookingService';


const initialState = {
    bookings: [],
    slots: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get user bookings
export const getMyBookings = createAsyncThunk(
    'bookings/getMy',
    async (_, thunkAPI) => {
        try {
            // The thunkAPI can get the state from other slices
            const token = thunkAPI.getState().auth.user.token;
            return await bookingService.getMyBookings(token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const getSlots = createAsyncThunk(
    'bookings/getSlots',
    async (_, thunkAPI) => {
        try {
            return await bookingService.getSlots();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// ADD THIS: Create new booking
export const createBooking = createAsyncThunk(
    'bookings/create',
    async (bookingData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await bookingService.createBooking(bookingData, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const submitPaymentDetails = createAsyncThunk(
    'bookings/submitPayment',
    async (paymentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await bookingService.submitPaymentDetails(paymentData, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = action.payload;
            })
            .addCase(getMyBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSlots.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSlots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.slots = action.payload;
            })
            .addCase(getSlots.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // ADD THESE CASES FOR createBooking
            .addCase(createBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                // --- ADD THIS CHECKPOINT ---
                console.log('Redux slice received this payload:', action.payload);
                // -------------------------
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'booking_created';
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(submitPaymentDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitPaymentDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'payment_submitted'; // Special message to signal success
                // Find the booking in the state and update it
                const index = state.bookings.findIndex(b => b._id === action.payload._id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(submitPaymentDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});





export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;