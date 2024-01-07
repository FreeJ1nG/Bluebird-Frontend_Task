import { createSlice } from '@reduxjs/toolkit';

export interface VehiclesSliceState {
  bookings: { id: string; timestamp: number }[];
  wishlist: { id: string; timestamp: number }[];
}

const initialState: VehiclesSliceState = {
  bookings: [],
  wishlist: [],
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    bookingAdded(state, action) {
      state.bookings.push(action.payload);
    },
    wishlistAdded(state, action) {
      state.wishlist.push(action.payload);
    },
    wishlistDeleted(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const { bookingAdded, wishlistAdded, wishlistDeleted } =
  vehiclesSlice.actions;

export default vehiclesSlice.reducer;
