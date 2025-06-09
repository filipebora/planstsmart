import React from 'react';
import { Plant } from '../../types';
import { Droplet } from 'lucide-react';
import Badge from '../ui/Badge';

type WateringScheduleProps = {
  plants: Plant[];
};

const WateringSchedule: React.FC<WateringScheduleProps> = ({ plants }) => {
  const sortedPlants = [...plants].sort((a, b) => {
    const dateA = new Date(a.nextWatering);
    const dateB = new Date(b.nextWatering);
    return dateA.getTime() - dateB.getTime();
  });

  const getDaysUntilWatering = (dateString: string) => {
    const today = new Date();
    const nextWatering = new Date(dateString);
    const diffTime = nextWatering.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatus = (days: number) => {
    if (days < 0) return { text: 'Overdue', variant: 'danger' as const };
    if (days === 0) return { text: 'Today', variant: 'warning' as const };
    if (days === 1) return { text: 'Tomorrow', variant: 'warning' as const };
    return { text: `In ${days} days`, variant: 'info' as const };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Watering Schedule</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {sortedPlants.slice(0, 5).map(plant => {
          const days = getDaysUntilWatering(plant.nextWatering);
          const status = getStatus(days);
          
          return (
            <li key={plant.id} className="px-4 py-3 flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{plant.name}</p>
                <p className="text-xs text-gray-500">{plant.location}</p>
              </div>
              <div className="flex items-center ml-4">
                <Droplet className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-gray-600">{formatDate(plant.nextWatering)}</span>
              </div>
              <Badge variant={status.variant} className="ml-4">
                {status.text}
              </Badge>
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-3 border-t border-gray-200">
        <button className="text-sm text-green-600 font-medium hover:text-green-700">
          View full schedule
        </button>
      </div>
    </div>
  );
};

export default WateringSchedule;