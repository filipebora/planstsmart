import React from 'react';
import { Plant } from '../../types';
import HealthIndicator from '../ui/HealthIndicator';
import { Leaf } from 'lucide-react';

type HealthSummaryProps = {
  plants: Plant[];
};

const HealthSummary: React.FC<HealthSummaryProps> = ({ plants }) => {
  const getAverageHealth = () => {
    if (plants.length === 0) return 0;
    const sum = plants.reduce((acc, plant) => acc + plant.healthScore, 0);
    return Math.round(sum / plants.length);
  };

  const getHealthCounts = () => {
    const result = { healthy: 0, warning: 0, critical: 0 };
    
    plants.forEach(plant => {
      if (plant.healthScore >= 80) result.healthy++;
      else if (plant.healthScore >= 60) result.warning++;
      else result.critical++;
    });
    
    return result;
  };

  const healthCounts = getHealthCounts();
  const averageHealth = getAverageHealth();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Plant Health</h3>
      
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mr-4 border-4 border-green-100">
          <span className="text-2xl font-bold text-green-600">{averageHealth}%</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 mb-2">Overall plant health</p>
          <HealthIndicator score={averageHealth} size="lg" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-green-50 p-3 text-center">
          <div className="flex justify-center mb-1">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <span className="block text-xl font-semibold text-green-700">{healthCounts.healthy}</span>
          <span className="text-sm text-green-600">Healthy</span>
        </div>
        
        <div className="rounded-lg bg-amber-50 p-3 text-center">
          <div className="flex justify-center mb-1">
            <Leaf className="h-5 w-5 text-amber-600" />
          </div>
          <span className="block text-xl font-semibold text-amber-700">{healthCounts.warning}</span>
          <span className="text-sm text-amber-600">Attention</span>
        </div>
        
        <div className="rounded-lg bg-red-50 p-3 text-center">
          <div className="flex justify-center mb-1">
            <Leaf className="h-5 w-5 text-red-600" />
          </div>
          <span className="block text-xl font-semibold text-red-700">{healthCounts.critical}</span>
          <span className="text-sm text-red-600">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default HealthSummary;