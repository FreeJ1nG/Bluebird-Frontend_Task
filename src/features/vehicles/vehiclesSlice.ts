import { createSlice } from '@reduxjs/toolkit';

export interface VehiclesSliceState {
  bookings: { id: string; timestamp: Date }[];
  wishlist: { id: string; timestamp: Date }[];
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
      delete state.wishlist[action.payload];
    },
  },
});

export const { bookingAdded, wishlistAdded, wishlistDeleted } =
  vehiclesSlice.actions;

export default vehiclesSlice.reducer;
