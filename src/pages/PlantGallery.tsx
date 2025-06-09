import React, { useState } from 'react';
import { usePlants } from '../contexts/PlantContext';
import { Camera, Calendar, Plus, X } from 'lucide-react';
import Button from '../components/ui/Button';

const PlantGallery: React.FC = () => {
  const { plants } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [showAddEntry, setShowAddEntry] = useState(false);

  // Mock diary entries
  const mockEntries = {
    '1': [
      {
        id: 1,
        date: '2025-05-15',
        image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
        note: 'Primeiro broto apareceu! 🌱',
      },
      {
        id: 2,
        date: '2025-05-10',
        image: 'https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg',
        note: 'Transplantada para um vaso maior.',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Galeria de Plantas</h2>
          <p className="text-gray-600 mt-1">Registre o crescimento das suas plantas</p>
        </div>
        
        <Button
          variant="primary"
          icon={<Camera className="h-5 w-5" />}
          onClick={() => setShowAddEntry(true)}
        >
          Novo Registro
        </Button>
      </div>

      {/* Plant Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {plants.map(plant => (
          <button
            key={plant.id}
            onClick={() => setSelectedPlant(plant.id)}
            className={`relative rounded-lg overflow-hidden aspect-square ${
              selectedPlant === plant.id ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-sm font-medium truncate">{plant.name}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Timeline */}
      {selectedPlant && mockEntries[selectedPlant] && (
        <div className="space-y-6">
          {mockEntries[selectedPlant].map(entry => (
            <div key={entry.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{entry.date}</span>
                </div>
              </div>
              <div className="aspect-video relative">
                <img
                  src={entry.image}
                  alt={`Entry from ${entry.date}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700">{entry.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Novo Registro</h3>
              <button onClick={() => setShowAddEntry(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planta
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione uma planta</option>
                  {plants.map(plant => (
                    <option key={plant.id} value={plant.id}>{plant.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Plus className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-600">Clique para adicionar uma foto</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anotações
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Adicione suas observações..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddEntry(false)}
                >
                  Cancelar
                </Button>
                <Button variant="primary">
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantGallery;