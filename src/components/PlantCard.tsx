import React from 'react';
import { Plant } from '../types';
import { Calendar, Droplet, Sun, ThermometerSun } from 'lucide-react';
import HealthIndicator from './ui/HealthIndicator';
import Badge from './ui/Badge';

type PlantCardProps = {
  plant: Plant;
  onClick: (id: string) => void;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
  };
  
  const getDaysUntilWatering = () => {
    const today = new Date();
    const nextWatering = new Date(plant.nextWatering);
    const diffTime = nextWatering.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getWateringStatus = () => {
    const days = getDaysUntilWatering();
    if (days < 0) return { text: 'Atrasada', variant: 'danger' as const };
    if (days === 0) return { text: 'Hoje', variant: 'warning' as const };
    if (days === 1) return { text: 'Amanhã', variant: 'warning' as const };
    return { text: `Em ${days} dias`, variant: 'info' as const };
  };
  
  const getLightIcon = () => {
    switch (plant.lightRequirement) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
    }
  };
  
  const wateringStatus = getWateringStatus();
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group"
      onClick={() => onClick(plant.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={wateringStatus.variant}>
            <Droplet className="w-3 h-3 mr-1" />
            {wateringStatus.text}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-800">{plant.name}</h3>
            <p className="text-sm text-gray-500">{plant.species}</p>
          </div>
          <HealthIndicator score={plant.healthScore} size="sm" showText={false} />
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-1 text-blue-500" />
            <span>A cada {plant.wateringFrequency} dias</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ThermometerSun className="w-4 h-4 mr-1 text-red-500" />
            <span>{plant.temperature.min}°-{plant.temperature.max}°C</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Sun className="w-4 h-4 mr-1 text-amber-500" />
            <span>{getLightIcon()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Droplet className="w-4 h-4 mr-1 text-blue-500" />
            <span>Última: {formatDate(plant.lastWatered)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;