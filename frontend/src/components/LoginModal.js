import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { X } from 'lucide-react';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-md relative shadow-2xl border border-slate-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"><X /></button>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back!</h2>
        {error && <p className="bg-red-500/10 text-red-400 p-3 rounded-md mb-4 border border-red-500/20 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors text-lg">Login</button>
        </form>
        <p className="text-center text-slate-400 mt-6">
          Don't have an account? <button onClick={onSwitchToRegister} className="text-red-500 hover:underline font-semibold">Register here</button>
        </p>
      </div>
    </div>
  );
};
export default LoginModal;
