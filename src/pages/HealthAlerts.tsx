import React from 'react';
import { usePlants } from '../contexts/PlantContext';
import { AlertTriangle, ThermometerSun, Droplets, Sun, Info } from 'lucide-react';
import Badge from '../components/ui/Badge';
import HealthIndicator from '../components/ui/HealthIndicator';

const HealthAlerts: React.FC = () => {
  const { plants } = usePlants();

  const getHealthAlerts = () => {
    return plants.map(plant => {
      const alerts = [];

      if (plant.healthScore < 60) {
        alerts.push({
          type: 'critical',
          message: 'Saúde crítica - Necessita atenção imediata',
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        });
      }

      if (plant.healthScore >= 60 && plant.healthScore < 80) {
        alerts.push({
          type: 'warning',
          message: 'Saúde em declínio - Verifique as condições',
          icon: <Info className="h-5 w-5 text-amber-500" />,
        });
      }

      const lastWatered = new Date(plant.lastWatered);
      const today = new Date();
      const daysSinceWatering = Math.floor((today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceWatering > plant.wateringFrequency) {
        alerts.push({
          type: 'warning',
          message: 'Rega atrasada',
          icon: <Droplets className="h-5 w-5 text-blue-500" />,
        });
      }

      return {
        plant,
        alerts,
      };
    }).filter(item => item.alerts.length > 0);
  };

  const alerts = getHealthAlerts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Alertas de Saúde</h2>
        <p className="text-gray-600 mt-1">Monitore a saúde das suas plantas</p>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <AlertTriangle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Tudo em ordem!</h3>
          <p className="text-gray-600">Suas plantas estão saudáveis e bem cuidadas.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {alerts.map(({ plant, alerts }) => (
            <div key={plant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">{plant.name}</h3>
                      <p className="text-sm text-gray-500">{plant.location}</p>
                    </div>
                  </div>
                  <HealthIndicator score={plant.healthScore} />
                </div>

                <div className="mt-6 space-y-4">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      {alert.icon}
                      <span className="ml-3 text-gray-700">{alert.message}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Condições Atuais</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <ThermometerSun className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {plant.temperature.min}°-{plant.temperature.max}°C
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {plant.humidity} umidade
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {plant.lightRequirement} luz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthAlerts;