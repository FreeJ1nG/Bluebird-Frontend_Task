// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  myBookings: path(ROOTS_DASHBOARD, 'my-bookings'),
  wishlist: path(ROOTS_DASHBOARD, 'wishlist'),
};
