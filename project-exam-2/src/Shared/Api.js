// base URL
const base_url = "https://v2.api.noroff.dev/";

//register user
export const register_user = `${base_url}auth/register`;

//login user
export const login_user = `${base_url}auth/login?_holidaze=true`;

// all venues
export const all_venues = `${base_url}holidaze/venues?_bookings=true`;

// venues by Profile (name)
export const venues_by_name = `${base_url}holidaze/profiles/<name>/venues`;

//single venue,
export const single_venue = `${base_url}holidaze/venues`; // !! add ID on the end of the URL !!
