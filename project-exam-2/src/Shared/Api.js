// base URL
const base_url = "https://v2.api.noroff.dev/";

//register user
export const register_user = `${base_url}auth/register`;

//login user
export const login_user = `${base_url}auth/login?_holidaze=true`;

// venues by Profile (name)
export const venues_by_name = `${base_url}holidaze/profiles`;

export const getapikey = `${base_url}auth/create-api-key`;

//venues

//single venue,
export const single_venue = `${base_url}holidaze/venues`; // !! add ID on the end of the URL !!

//search venues
export const search_venues = `${base_url}holidaze/venues/search`;

// all venues
export const all_venues = `${base_url}holidaze/venues?_bookings=true`;

//  Create a venue
export const create_venue = `${base_url}holidaze/venues`;

// Delete venue
export const delete_venue = `${base_url}holidaze/venues`; // !! add ID on the end of the URL !!

//update venue
export const update_venue = `${base_url}holidaze/venues`; // !! add ID on the end of the URL!!

//bookings

// create bookings:
export const create_booking = `${base_url}holidaze/bookings`;

//bookings by profile

export const bookings_by_profile = `${base_url}holidaze/profiles/`;

//profile
//single profile
export const single_profile = `${base_url}holidaze/profiles`; // !! add the name on the end of the URL !!

//update profile
export const update_profile = `${base_url}holidaze/profiles`; // !! add the name on the end of the URL !!
