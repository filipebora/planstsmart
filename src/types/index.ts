export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  healthScore: number;
  lastWatered: string;
  nextWatering: string;
  location: string;
  wateringFrequency: number; // in days
  lightRequirement: 'low' | 'medium' | 'high';
  humidity: 'low' | 'medium' | 'high';
  temperature: {
    min: number;
    max: number;
  };
  notes: string;
}

export interface User {
  name: string;
  avatar: string;
  plantsCount: number;
  location: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  forecast: 'sunny' | 'cloudy' | 'rainy';
}