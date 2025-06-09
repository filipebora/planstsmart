import { Plant } from '../types';

export const plantsData: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    species: 'Monstera',
    image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    healthScore: 92,
    lastWatered: '2025-05-10',
    nextWatering: '2025-05-17',
    location: 'Sala de Estar',
    wateringFrequency: 7,
    lightRequirement: 'medium',
    humidity: 'high',
    temperature: {
      min: 18,
      max: 30,
    },
    notes: 'Prosperando bem perto da janela voltada para o leste',
  }
];

export const user = {
  name: 'Usuario1',
  avatar: 'https://i0.wp.com/amsterdamnews.com/wp-content/uploads/2016/05/Lebron_suit.jpg?fit=236%2C353&ssl=1',
  plantsCount: plantsData.length,
  location: 'Belo horizonte, MG',
};

export const weatherData = {
  temperature: 24,
  humidity: 65,
  forecast: 'sunny' as const,
};