import React, { useState, useEffect } from 'react';
import { LogOut, Menu } from 'lucide-react';
import logo from '../../assets/icons/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../services/apiAuth';

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token')); 

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log('Token:', token);

      if (token) {
        await logOut(token); 
      }
      sessionStorage.clear(); 
      setIsLoggedIn(false); 
      navigate('/LoginPage'); 
      window.location.reload(); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('token'));
  }, [sessionStorage.getItem('token')]);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => handleNavigation('/')}
            className="focus:outline-none"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16"
            />
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => handleNavigation('/page-aboutus')}
            className="text-sm font-medium text-gray-700 hover:text-red-500 transition-all duration-300"
          >
            Thông tin về chúng tôi
          </button>
          <button
            onClick={() => handleNavigation('/page-policy')}
            className="text-sm font-medium text-gray-700 hover:text-red-500 transition-all duration-300"
          >
            Điều khoản thành viên
          </button>
          <button
            onClick={() => handleNavigation('/trade')}
            className="text-sm font-medium text-gray-700 hover:text-red-500 transition-all duration-300"
          >
            Trung tâm giao dịch
          </button>
          <button
            onClick={() => handleNavigation('/wallet')}
            className="text-sm font-medium text-gray-700 hover:text-red-500 transition-all duration-300"
          >
            Trung tâm thành viên
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <Menu size={24} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            <LogOut size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-600 hidden md:block">Đăng xuất</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <button
            onClick={() => handleNavigation('/page-aboutus')}
            className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Thông tin về chúng tôi
          </button>
          <button
            onClick={() => handleNavigation('/page-policy')}
            className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Điều khoản thành viên
          </button>
          <button
            onClick={() => handleNavigation('/trade')}
            className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Trung tâm giao dịch
          </button>
          <button
            onClick={() => handleNavigation('/wallet')}
            className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Trung tâm thành viên
          </button>
        </div>
      )}
    </header>
  );
};