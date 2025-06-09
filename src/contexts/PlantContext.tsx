import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Plant, WeatherData } from '../types';
import { weatherData as initialWeatherData } from '../data/plants';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type PlantContextType = {
  plants: Plant[];
  addPlant: (plant: Plant) => Promise<void>;
  updatePlant: (plant: Plant) => Promise<void>;
  deletePlant: (id: string) => Promise<void>;
  getPlantById: (id: string) => Plant | undefined;
  weatherData: WeatherData;
};

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [weatherData] = useState<WeatherData>(initialWeatherData);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plants:', error);
      return;
    }

    setPlants(data.map(plant => ({
      ...plant,
      temperature: {
        min: plant.temperature_min,
        max: plant.temperature_max
      }
    })));
  };

  const addPlant = async (plant: Plant) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('plants')
      .insert([{
        user_id: session.user.id,
        name: plant.name,
        species: plant.species,
        image: plant.image,
        health_score: plant.healthScore,
        last_watered: plant.lastWatered,
        next_watering: plant.nextWatering,
        location: plant.location,
        watering_frequency: plant.wateringFrequency,
        light_requirement: plant.lightRequirement,
        humidity: plant.humidity,
        temperature_min: plant.temperature.min,
        temperature_max: plant.temperature.max,
        notes: plant.notes
      }]);

    if (error) {
      console.error('Error adding plant:', error);
      return;
    }

    await fetchPlants();
  };

  const updatePlant = async (plant: Plant) => {
    const { error } = await supabase
      .from('plants')
      .update({
        name: plant.name,
        species: plant.species,
        image: plant.image,
        health_score: plant.healthScore,
        last_watered: plant.lastWatered,
        next_watering: plant.nextWatering,
        location: plant.location,
        watering_frequency: plant.wateringFrequency,
        light_requirement: plant.lightRequirement,
        humidity: plant.humidity,
        temperature_min: plant.temperature.min,
        temperature_max: plant.temperature.max,
        notes: plant.notes
      })
      .eq('id', plant.id);

    if (error) {
      console.error('Error updating plant:', error);
      return;
    }

    await fetchPlants();
  };

  const deletePlant = async (id: string) => {
    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting plant:', error);
      return;
    }

    await fetchPlants();
  };

  const getPlantById = (id: string) => {
    return plants.find(plant => plant.id === id);
  };

  return (
    <PlantContext.Provider value={{ 
      plants, 
      addPlant, 
      updatePlant, 
      deletePlant, 
      getPlantById,
      weatherData
    }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};