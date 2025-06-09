import React from 'react';
import { usePlants } from '../contexts/PlantContext';
import PlantCard from '../components/PlantCard';
import WeatherCard from '../components/Dashboard/WeatherCard';
import WateringSchedule from '../components/Dashboard/WateringSchedule';
import HealthSummary from '../components/Dashboard/HealthSummary';
import AIRecommendations from '../components/Dashboard/AIRecommendations';
import { Plane as Plant2, Search } from 'lucide-react';
import { user } from '../data/plants';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { plants, weatherData } = usePlants();
  const navigate = useNavigate();

  const handlePlantClick = (id: string) => {
    navigate(`/plantas/${id}`);
  };

  const handleViewAllPlants = () => {
    navigate('/plantas');
  };

  const handleViewSchedule = () => {
    navigate('/agenda');
  };

  const handleViewAlerts = () => {
    navigate('/alertas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg')] bg-cover opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-800 to-emerald-700 p-8 mb-8 shadow-xl">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg')] bg-cover opacity-10"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome to your garden, {user.name.split(' ')[0]}
                  </h2>
                  <p className="text-green-100">Nurturing {plants.length} thriving plants in your collection</p>
                </div>
                
                <div className="mt-4 md:mt-0 relative">
                  <div className="relative rounded-full bg-white/10 backdrop-blur-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-green-100" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border-0 bg-transparent rounded-full text-green-100 placeholder-green-200 focus:ring-2 focus:ring-green-300 focus:outline-none"
                      placeholder="Search your garden..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
                <WeatherCard weatherData={weatherData} />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-green-900 flex items-center">
                    <Plant2 className="h-6 w-6 text-green-700 mr-2" />
                    Your Garden
                  </h3>
                  <button 
                    onClick={handleViewAllPlants}
                    className="text-sm text-green-700 font-medium hover:text-green-800 transition-colors"
                  >
                    View all plants
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {plants.slice(0, 4).map(plant => (
                    <div key={plant.id} className="transform hover:scale-105 transition-transform duration-300">
                      <PlantCard 
                        plant={plant} 
                        onClick={handlePlantClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer"
                onClick={handleViewAlerts}
              >
                <HealthSummary plants={plants} />
              </div>
              
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                onClick={handleViewSchedule}
              >
                <WateringSchedule plants={plants} />
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden">
                <AIRecommendations plants={plants} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;