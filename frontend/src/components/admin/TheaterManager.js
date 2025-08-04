import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { adminAddTheater, adminUpdateTheater, adminDeleteTheater } from '../../services/api';

const TheaterManager = ({ theaters, onTheatersUpdate }) => {
  const { token } = useContext(AuthContext);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSelectTheater = (theater) => { setSelectedTheater(theater); setFormData(theater); };
  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedTheaters;
      if (selectedTheater) {
        const updatedTheater = await adminUpdateTheater(selectedTheater.theater_id, formData, token);
        updatedTheaters = theaters.map(t => t.theater_id === updatedTheater.theater_id ? updatedTheater : t);
      } else {
        const newTheater = await adminAddTheater(formData, token);
        updatedTheaters = [...theaters, newTheater];
      }
      onTheatersUpdate(updatedTheaters);
      resetForm();
    } catch (error) { alert("Error: " + error.message); }
  };

  const handleDelete = async () => {
    if (!selectedTheater || !window.confirm("Are you sure? This will also delete all associated shows.")) return;
    try {
      await adminDeleteTheater(selectedTheater.theater_id, token);
      onTheatersUpdate(theaters.filter(t => t.theater_id !== selectedTheater.theater_id));
      resetForm();
    } catch (error) { alert("Error: " + error.message); }
  };

  const resetForm = () => { setSelectedTheater(null); setFormData({}); };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <h3 className="text-xl font-bold mb-4">Theaters List</h3>
        <ul className="bg-slate-900 rounded-lg p-2 max-h-96 overflow-y-auto">
          {theaters.map(theater => (
            <li key={theater.theater_id} onClick={() => handleSelectTheater(theater)} className={`p-2 rounded cursor-pointer ${selectedTheater?.theater_id === theater.theater_id ? 'bg-red-600' : 'hover:bg-slate-700'}`}>
              {theater.name} <span className="text-xs text-slate-400">({theater.city})</span>
            </li>
          ))}
        </ul>
        <button onClick={resetForm} className="mt-4 w-full bg-blue-600 p-2 rounded-lg font-semibold hover:bg-blue-700">Add New Theater</button>
      </div>
      <div className="w-full md:w-2/3">
        <h3 className="text-xl font-bold mb-4">{selectedTheater ? 'Edit Theater' : 'Add New Theater'}</h3>
        <form onSubmit={handleFormSubmit} className="bg-slate-900 p-6 rounded-lg space-y-4">
          <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Theater Name" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <input name="city" value={formData.city || ''} onChange={handleInputChange} placeholder="City" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <input name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Address" className="w-full bg-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <div className="flex gap-4">
            <button type="submit" className="w-full bg-green-600 p-2 rounded-lg font-semibold hover:bg-green-700">Save Theater</button>
            {selectedTheater && (
              <button type="button" onClick={handleDelete} className="w-full bg-red-600 p-2 rounded-lg font-semibold hover:bg-red-700">Delete Theater</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default TheaterManager;