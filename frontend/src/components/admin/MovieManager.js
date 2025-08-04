import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
// Assuming you have these api service functions
import { adminAddMovie, adminUpdateMovie, adminDeleteMovie } from '../../services/api';

const MovieManager = ({ movies, onMoviesUpdate }) => {
  const { token } = useContext(AuthContext);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({});
  // ▼▼▼ NEW STATE FOR FILE HANDLING ▼▼▼
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData(movie);
    // ▼▼▼ SHOW EXISTING POSTER ON SELECT ▼▼▼
    setPreview(movie.poster_url ? `${process.env.REACT_APP_API_URL}${movie.poster_url}` : null);
    setSelectedFile(null); // Clear any previously selected new file
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // ▼▼▼ NEW HANDLER FOR FILE INPUT ▼▼▼
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // ▼▼▼ UPDATED TO USE FormData FOR FILE UPLOADS ▼▼▼
    const data = new FormData();
    // Append all form fields to the FormData object
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (selectedFile) {
      // The key 'posterImage' must match the backend (multer)
      data.append('posterImage', selectedFile);
    }
    
    try {
      let updatedMovies;
      if (selectedMovie) {
        // Your adminUpdateMovie function will also need to be adapted to send FormData
        const updatedMovie = await adminUpdateMovie(selectedMovie.movie_id, data, token);
        updatedMovies = movies.map(m => m.movie_id === updatedMovie.movie_id ? updatedMovie : m);
      } else {
        if (!selectedFile) {
            alert("Please select a poster image.");
            return;
        }
        const newMovie = await adminAddMovie(data, token);
        updatedMovies = [...movies, newMovie];
      }
      onMoviesUpdate(updatedMovies);
      resetForm();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async () => {
    if (!selectedMovie || !window.confirm("Are you sure?")) return;
    try {
      await adminDeleteMovie(selectedMovie.movie_id, token);
      onMoviesUpdate(movies.filter(m => m.movie_id !== selectedMovie.movie_id));
      resetForm();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setSelectedMovie(null);
    setFormData({});
    // ▼▼▼ RESET FILE STATE ▼▼▼
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <h3 className="text-xl font-bold mb-4">Movies List</h3>
        <ul className="bg-slate-900 rounded-lg p-2 max-h-96 overflow-y-auto">
          {movies.map(movie => (
            <li key={movie.movie_id} onClick={() => handleSelectMovie(movie)} className={`p-2 rounded cursor-pointer ${selectedMovie?.movie_id === movie.movie_id ? 'bg-red-600' : 'hover:bg-slate-700'}`}>
              {movie.title}
            </li>
          ))}
        </ul>
        <button onClick={resetForm} className="mt-4 w-full bg-blue-600 p-2 rounded-lg font-semibold hover:bg-blue-700">Add New Movie</button>
      </div>
      <div className="w-full md:w-2/3">
        <h3 className="text-xl font-bold mb-4">{selectedMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
        
        {/* ▼▼▼ UPDATED PREVIEW LOGIC ▼▼▼ */}
        {preview && (
          <div className="mb-4">
             <p className="text-sm text-slate-400 mb-2">Poster Preview:</p>
            <img src={preview} alt="Poster Preview" className="rounded-lg max-h-60 w-auto" />
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="bg-slate-900 p-6 rounded-lg space-y-4">
          <input name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Title" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required/>
          <textarea name="synopsis" value={formData.synopsis || ''} onChange={handleInputChange} placeholder="Synopsis" className="w-full bg-slate-700 p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-red-500" />
          
          {/* ▼▼▼ REPLACED POSTER URL INPUT WITH FILE INPUT ▼▼▼ */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Poster Image</label>
            <input 
              type="file" 
              name="posterImage" 
              onChange={handleFileChange} 
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
            />
          </div>

          <input name="genre" value={formData.genre || ''} onChange={handleInputChange} placeholder="Genre" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
          <div className="flex gap-4">
            <input name="duration_minutes" type="number" value={formData.duration_minutes || ''} onChange={handleInputChange} placeholder="Duration (mins)" className="w-1/2 bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
            <input name="rating" type="number" step="0.1" value={formData.rating || ''} onChange={handleInputChange} placeholder="Rating" className="w-1/2 bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="w-full bg-green-600 p-2 rounded-lg font-semibold hover:bg-green-700">Save Movie</button>
            {selectedMovie && (
              <button type="button" onClick={handleDelete} className="w-full bg-red-600 p-2 rounded-lg font-semibold hover:bg-red-700">Delete Movie</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default MovieManager;