import React from 'react';
import { Leaf, Bell, User, Menu, Search } from 'lucide-react';
import { user } from '../data/plants';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <Leaf className="h-8 w-8 text-green-700" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">PlantSmart</h1>
            </div>
            
            <div className="hidden md:block ml-10">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Buscar plantas..."
                  className="input pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={() => navigate('/perfil')}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <img 
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-200"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.location}</p>
              </div>
            </button>
          </div>
          
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;