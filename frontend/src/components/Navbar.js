import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import AdminLoginModal from './AdminLoginModal'; 
import { Ticket, Clapperboard, UserCircle } from 'lucide-react';

const Navbar = ({ onNavigate }) => {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer">
              <Clapperboard className="text-red-500" size={32} />
              <h1 className="text-2xl font-bold text-white tracking-wider">BookYourShow</h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <button onClick={() => onNavigate('admin')} className="hidden sm:block text-slate-300 hover:text-red-500 transition-colors">Admin</button>
                  )}
                  <button onClick={() => onNavigate('tickets')} className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-red-500 transition-colors">
                    <Ticket size={20} /> My Tickets
                  </button> 
                  <div className="flex items-center gap-2">
                    <UserCircle className="text-slate-400" size={24}/>
                    <span className="text-white font-medium hidden md:block">Welcome, {user.name}</span>
                  </div>
                  <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">Logout</button>
                </>
              ) : (
                <>
                   <button onClick={() => setShowLogin(true)} className="text-slate-300 hover:text-white transition-colors font-medium">Login</button>
                  <button onClick={() => setShowRegister(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">Sign Up</button>
                  <button onClick={() => setShowAdminLogin(true)} className="text-yellow-400 hover:text-yellow-500 transition-colors font-medium">Admin Login</button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} onNavigate={onNavigate} />}
    </>
  );
};
export default Navbar;
