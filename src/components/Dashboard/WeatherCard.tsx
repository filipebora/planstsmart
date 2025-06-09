import React from 'react';
import { Cloud, CloudRain, Droplets, Sun, Thermometer } from 'lucide-react';
import { WeatherData } from '../../types';

type WeatherCardProps = {
  weatherData: WeatherData;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getWeatherIcon = () => {
    switch (weatherData.forecast) {
      case 'sunny':
        return <Sun className="w-10 h-10 text-amber-500" />;
      case 'cloudy':
        return <Cloud className="w-10 h-10 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-10 h-10 text-blue-500" />;
      default:
        return <Sun className="w-10 h-10 text-amber-500" />;
    }
  };

  const getWeatherMessage = () => {
    switch (weatherData.forecast) {
      case 'sunny':
        return "It's a sunny day. Consider checking if your plants need shade.";
      case 'cloudy':
        return "It's cloudy today. Your plants should be fine with regular care.";
      case 'rainy':
        return "It's rainy today. You may be able to skip watering some plants.";
      default:
        return "Check your plants' specific needs based on today's weather.";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Weather</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getWeatherIcon()}
          <div className="ml-3">
            <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
            <div className="text-gray-500 capitalize">{weatherData.forecast}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <Droplets className="w-5 h-5 text-blue-500 mb-1" />
            <span className="text-sm text-gray-600">{weatherData.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <Thermometer className="w-5 h-5 text-red-500 mb-1" />
            <span className="text-sm text-gray-600">Feels like {weatherData.temperature - 1}°</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
        {getWeatherMessage()}
      </p>
    </div>
  );
};

export default WeatherCard;