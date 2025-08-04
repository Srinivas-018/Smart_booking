import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { adminAddShow, adminUpdateShow, adminDeleteShow } from '../../services/api';

const ShowManager = ({ shows, movies, theaters, onShowsUpdate }) => {
  const { token } = useContext(AuthContext);
  const [selectedShow, setSelectedShow] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSelectShow = (show) => {
    setSelectedShow(show);
    setFormData({ ...show, show_time: new Date(show.show_time).toISOString().slice(0, 16) });
  };

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedShows;
      
      // ▼▼▼ CORRECTED DATA PREPARATION ▼▼▼
      // Convert movie and theater IDs from string (from form) to number
      const dataToSend = { 
        ...formData, 
        movie_id: parseInt(formData.movie_id, 10),
        theater_id: parseInt(formData.theater_id, 10),
        show_time: new Date(formData.show_time).toISOString() 
      };
      
      if (selectedShow) {
        const updatedShow = await adminUpdateShow(selectedShow.show_id, dataToSend, token);
        updatedShows = shows.map(s => s.show_id === updatedShow.show_id ? updatedShow : s);
      } else {
        const newShowFromApi = await adminAddShow(dataToSend, token);

        // This lookup logic will now work correctly because the IDs will match in type
        const movieForShow = movies.find(m => m.movie_id === newShowFromApi.movie_id);
        const theaterForShow = theaters.find(t => t.theater_id === newShowFromApi.theater_id);

        const newShowForState = {
          ...newShowFromApi,
          Movie: movieForShow,
          Theater: theaterForShow,
        };

        updatedShows = [...shows, newShowForState];
      }
      onShowsUpdate(updatedShows);
      resetForm();
    } catch (error) { alert("Error: " + error.message); }
  };

  const handleDelete = async () => {
    if (!selectedShow || !window.confirm("Are you sure?")) return;
    try {
      await adminDeleteShow(selectedShow.show_id, token);
      onShowsUpdate(shows.filter(s => s.show_id !== selectedShow.show_id));
      resetForm();
    } catch (error) { alert("Error: " + error.message); }
  };

  const resetForm = () => { setSelectedShow(null); setFormData({}); };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <h3 className="text-xl font-bold mb-4">Shows List</h3>
        <ul className="bg-slate-900 rounded-lg p-2 max-h-96 overflow-y-auto">
          {shows.map(show => (
            <li key={show.show_id} onClick={() => handleSelectShow(show)} className={`p-2 rounded cursor-pointer ${selectedShow?.show_id === show.show_id ? 'bg-red-600' : 'hover:bg-slate-700'}`}>
              {show.Movie?.title || 'Unknown Movie'} @ {show.Theater?.name || 'Unknown Theater'}
              <span className="block text-xs text-slate-400">{new Date(show.show_time).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <button onClick={resetForm} className="mt-4 w-full bg-blue-600 p-2 rounded-lg font-semibold hover:bg-blue-700">Add New Show</button>
      </div>
      <div className="w-full md:w-2/3">
        <h3 className="text-xl font-bold mb-4">{selectedShow ? 'Edit Show' : 'Add New Show'}</h3>
        <form onSubmit={handleFormSubmit} className="bg-slate-900 p-6 rounded-lg space-y-4">
          <select name="movie_id" value={formData.movie_id || ''} onChange={handleInputChange} className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required>
            <option value="">Select a Movie</option>
            {movies.map(movie => <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>)}
          </select>
          <select name="theater_id" value={formData.theater_id || ''} onChange={handleInputChange} className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required>
            <option value="">Select a Theater</option>
            {theaters.map(theater => <option key={theater.theater_id} value={theater.theater_id}>{theater.name}</option>)}
          </select>
          <input name="show_time" type="datetime-local" value={formData.show_time || ''} onChange={handleInputChange} className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <input name="screen_name" value={formData.screen_name || ''} onChange={handleInputChange} placeholder="Screen Name (e.g., Audi 1)" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <input name="base_price" type="number" step="0.01" value={formData.base_price || ''} onChange={handleInputChange} placeholder="Base Ticket Price" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <div className="flex gap-4">
            <button type="submit" className="w-full bg-green-600 p-2 rounded-lg font-semibold hover:bg-green-700">Save Show</button>
            {selectedShow && (
              <button type="button" onClick={handleDelete} className="w-full bg-red-600 p-2 rounded-lg font-semibold hover:bg-red-700">Delete Show</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default ShowManager;