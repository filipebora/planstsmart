import React, { useState } from 'react';
import { usePlants } from '../contexts/PlantContext';
import { Calendar, Filter, ChevronLeft, ChevronRight, Droplet } from 'lucide-react';
import Badge from '../components/ui/Badge';

const WateringSchedule: React.FC = () => {
  const { plants } = usePlants();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getDaysInRange = () => {
    const days = [];
    const start = new Date(currentDate);
    const daysToShow = view === 'week' ? 7 : 30;

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const getPlantsForDate = (date: Date) => {
    return plants.filter(plant => {
      const wateringDate = new Date(plant.nextWatering);
      return wateringDate.toDateString() === date.toDateString();
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const days = view === 'week' ? 7 : 30;
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? days : -days));
    setCurrentDate(newDate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Agenda de Rega</h2>
          <p className="text-gray-600 mt-1">Planeje e acompanhe a rega das suas plantas</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-md ${
                view === 'week' 
                  ? 'bg-green-100 text-green-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-md ${
                view === 'month' 
                  ? 'bg-green-100 text-green-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Mês
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 divide-y">
          {getDaysInRange().map((date, index) => {
            const plantsForDay = getPlantsForDate(date);
            if (plantsForDay.length === 0) return null;

            return (
              <div key={index} className="p-4">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-800">
                    {formatDate(date)}
                  </span>
                </div>
                <div className="space-y-3">
                  {plantsForDay.map(plant => (
                    <div
                      key={plant.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-800">{plant.name}</h4>
                          <p className="text-sm text-gray-500">{plant.location}</p>
                        </div>
                      </div>
                      <Badge variant="info">
                        <Droplet className="w-3 h-3 mr-1" />
                        Regar
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WateringSchedule;