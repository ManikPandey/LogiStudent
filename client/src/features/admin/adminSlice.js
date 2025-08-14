import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

const initialState = {
    bookings: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Async thunks
export const getAllBookings = createAsyncThunk('admin/getAllBookings', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminService.getAllBookings(token);
    } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
    
});

export const updateBookingStatus = createAsyncThunk('admin/updateStatus', async ({ bookingId, status }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminService.updateBookingStatus(bookingId, status, token);
    } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSlots = createAsyncThunk('admin/getSlots', async (_, thunkAPI) => {
    try {
        return await adminService.getSlots();
    } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createSlot = createAsyncThunk('admin/createSlot', async (slotData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminService.createSlot(slotData, token);
    } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteSlot = createAsyncThunk('admin/deleteSlot', async (slotId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        await adminService.deleteSlot(slotId, token);
        return slotId; // Return the id to the reducer to filter it out
    } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookings.pending, (state) => { state.isLoading = true; })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload;
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                const index = state.bookings.findIndex(b => b._id === action.payload._id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(getSlots.pending, (state) => { state.isLoading = true; })
            .addCase(getSlots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.slots = action.payload;
            })
            .addCase(getSlots.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createSlot.fulfilled, (state, action) => {
                state.slots.push(action.payload);
            })
            .addCase(deleteSlot.fulfilled, (state, action) => {
                state.slots = state.slots.filter((slot) => slot._id !== action.payload);
            });
    },
});


export const { reset } = adminSlice.actions;
export default adminSlice.reducer;