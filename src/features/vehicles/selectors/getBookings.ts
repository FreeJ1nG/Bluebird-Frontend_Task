import { RootState } from '@/modules/redux/store';

export const selectBookings = (state: RootState) => state.vehicles.bookings;

export const selectWishlist = (state: RootState) => state.vehicles.wishlist;
