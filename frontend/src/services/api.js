const API_BASE_URL = 'http://localhost:3001/api';

const request = async (url, options = {}) => {
  const headers = { ...options.headers };

  // If the body is FormData, let the browser set the Content-Type.
  // Otherwise, set it to application/json.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'An error occurred');
  }

  if (response.status === 204) return;
  return response.json();
};

export const fetchMovies = () => request('/movies');
export const fetchMovieById = (id) => request(`/movies/${id}`);
export const fetchTheaters = () => request('/theaters');
export const fetchShowsForMovie = (movieId) => request(`/shows?movieId=${movieId || ''}`);
export const apiLogin = (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const apiRegister = (name, email, password) => request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
export const apiAdminLogin = (email, password) => request('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const apiGetProfile = (token) => request('/auth/me', { headers: { 'x-access-token': token } });
export const startBooking = (show_id, seats, token) => request('/bookings/start', { method: 'POST', body: JSON.stringify({ show_id, seats }), headers: { 'x-access-token': token } });
export const confirmBooking = (booking_id, token) => request('/bookings/confirm', { method: 'POST', body: JSON.stringify({ booking_id }), headers: { 'x-access-token': token } });
export const fetchBookingHistory = (token) => request('/bookings/history', { headers: { 'x-access-token': token } });
export const createReview = (movieId, data, token) => request(`/reviews/movie/${movieId}`, { method: 'POST', body: JSON.stringify(data), headers: { 'x-access-token': token } });

// ▼▼▼ CORRECTED FUNCTIONS FOR FILE UPLOAD ▼▼▼

// The 'data' parameter here is expected to be a FormData object
export const adminAddMovie = (data, token) => request('/admin/movies', { 
    method: 'POST', 
    body: data, // Pass FormData directly
    headers: { 'x-access-token': token } 
});

// The 'data' parameter here is also expected to be a FormData object
export const adminUpdateMovie = (id, data, token) => request(`/admin/movies/${id}`, { 
    method: 'PUT', 
    body: data, // Pass FormData directly
    headers: { 'x-access-token': token } 
});

export const adminDeleteMovie = (id, token) => request(`/admin/movies/${id}`, { 
    method: 'DELETE', 
    headers: { 'x-access-token': token } 
});

export const adminAddTheater = (data, token) => request('/admin/theaters', { method: 'POST', body: JSON.stringify(data), headers: { 'x-access-token': token } });
export const adminUpdateTheater = (id, data, token) => request(`/admin/theaters/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'x-access-token': token } });
export const adminDeleteTheater = (id, token) => request(`/admin/theaters/${id}`, { method: 'DELETE', headers: { 'x-access-token': token } });
export const adminAddShow = (data, token) => request('/admin/shows', { method: 'POST', body: JSON.stringify(data), headers: { 'x-access-token': token } });
export const adminUpdateShow = (id, data, token) => request(`/admin/shows/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'x-access-token': token } });
export const adminDeleteShow = (id, token) => request(`/admin/shows/${id}`, { method: 'DELETE', headers: { 'x-access-token': token } });
export const adminGetAllBookings = (token) => {
  return request('/admin/bookings', {
    headers: { 'x-access-token': token }
  });
};