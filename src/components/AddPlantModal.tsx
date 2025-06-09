import React, { useState } from 'react';
import { X, Upload, Droplet, Sun, ThermometerSun, Wind, Search, Filter, Plus, Calendar } from 'lucide-react';
import Button from './ui/Button';
import { plantDatabase } from '../data/plantDatabase';
import Badge from './ui/Badge';

interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plant: any) => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlants, setSelectedPlants] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('all');
  const [step, setStep] = useState<'selection' | 'configuration'>('selection');
  const [plantConfigs, setPlantConfigs] = useState<Record<string, {
    wateringFrequency: number;
    lightRequirement: 'low' | 'medium' | 'high';
    humidity: 'low' | 'medium' | 'high';
    location: string;
    tempMin: number;
    tempMax: number;
    notes: string;
    healthScore: number;
  }>>({});

  const filteredPlants = plantDatabase.filter(plant => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || plant.difficulty.toLowerCase() === filter;
    
    return matchesSearch && matchesFilter;
  });

  const togglePlantSelection = (plantId: string) => {
    const newSelection = new Set(selectedPlants);
    if (newSelection.has(plantId)) {
      newSelection.delete(plantId);
      const newConfigs = { ...plantConfigs };
      delete newConfigs[plantId];
      setPlantConfigs(newConfigs);
    } else {
      newSelection.add(plantId);
      const plant = plantDatabase.find(p => p.id === plantId);
      if (plant) {
        setPlantConfigs(prev => ({
          ...prev,
          [plantId]: {
            wateringFrequency: 7,
            lightRequirement: 'medium',
            humidity: 'medium',
            location: '',
            tempMin: parseInt(plant.temperature.split('-')[0]),
            tempMax: parseInt(plant.temperature.split('-')[1]),
            notes: plant.description,
            healthScore: 100
          }
        }));
      }
    }
    setSelectedPlants(newSelection);
  };

  const updatePlantConfig = (plantId: string, field: string, value: any) => {
    setPlantConfigs(prev => ({
      ...prev,
      [plantId]: {
        ...prev[plantId],
        [field]: value
      }
    }));
  };

  const handleAddPlants = () => {
    const plantsToAdd = plantDatabase
      .filter(plant => selectedPlants.has(plant.id))
      .map(plant => ({
        id: crypto.randomUUID(),
        name: plant.name,
        species: plant.scientificName,
        image: plant.image,
        healthScore: plantConfigs[plant.id].healthScore,
        lastWatered: new Date().toISOString(),
        nextWatering: new Date(Date.now() + (plantConfigs[plant.id].wateringFrequency * 24 * 60 * 60 * 1000)).toISOString(),
        location: plantConfigs[plant.id].location,
        wateringFrequency: plantConfigs[plant.id].wateringFrequency,
        lightRequirement: plantConfigs[plant.id].lightRequirement,
        humidity: plantConfigs[plant.id].humidity,
        temperature: {
          min: plantConfigs[plant.id].tempMin,
          max: plantConfigs[plant.id].tempMax
        },
        notes: plantConfigs[plant.id].notes
      }));

    plantsToAdd.forEach(plant => onAdd(plant));
    onClose();
    setStep('selection');
    setSelectedPlants(new Set());
    setPlantConfigs({});
  };

  const handleBack = () => {
    setStep('selection');
  };

  const handleNext = () => {
    if (selectedPlants.size > 0) {
      setStep('configuration');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 'selection' ? 'Selecionar Plantas' : 'Configurar Plantas'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {step === 'selection' ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar plantas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400 h-5 w-5" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">Todas as dificuldades</option>
                    <option value="fácil">Fácil manutenção</option>
                    <option value="moderada">Manutenção moderada</option>
                    <option value="difícil">Manutenção difícil</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[50vh] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlants.map(plant => (
                  <div
                    key={plant.id}
                    onClick={() => togglePlantSelection(plant.id)}
                    className={`relative bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${
                      selectedPlants.has(plant.id)
                        ? 'border-green-500 shadow-md'
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                  >
                    <div className="h-40 relative">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedPlants.has(plant.id) && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <div className="bg-white rounded-full p-2">
                            <Plus className="h-6 w-6 text-green-500" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{plant.name}</h3>
                      <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant={
                          plant.difficulty === 'Fácil' ? 'success' :
                          plant.difficulty === 'Moderada' ? 'warning' : 'danger'
                        }>
                          {plant.difficulty}
                        </Badge>
                        <Badge variant="info">{plant.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="overflow-y-auto max-h-[70vh] p-6">
            <div className="space-y-6">
              {Array.from(selectedPlants).map(plantId => {
                const plant = plantDatabase.find(p => p.id === plantId);
                if (!plant) return null;

                return (
                  <div key={plantId} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{plant.name}</h3>
                        <p className="text-sm text-gray-500">{plant.scientificName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Saúde Inicial (%)
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={plantConfigs[plantId].healthScore}
                            onChange={(e) => updatePlantConfig(plantId, 'healthScore', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequência de Rega (dias)
                        </label>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={plantConfigs[plantId].wateringFrequency}
                            onChange={(e) => updatePlantConfig(plantId, 'wateringFrequency', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Localização
                        </label>
                        <div className="flex items-center">
                          <Wind className="h-5 w-5 text-gray-400 mr-2" />
                          <input
                            type="text"
                            placeholder="Ex: Sala de estar"
                            value={plantConfigs[plantId].location}
                            onChange={(e) => updatePlantConfig(plantId, 'location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Necessidade de Luz
                        </label>
                        <div className="flex items-center">
                          <Sun className="h-5 w-5 text-gray-400 mr-2" />
                          <select
                            value={plantConfigs[plantId].lightRequirement}
                            onChange={(e) => updatePlantConfig(plantId, 'lightRequirement', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Umidade
                        </label>
                        <div className="flex items-center">
                          <Droplet className="h-5 w-5 text-gray-400 mr-2" />
                          <select
                            value={plantConfigs[plantId].humidity}
                            onChange={(e) => updatePlantConfig(plantId, 'humidity', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Temperatura (°C)
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 flex items-center">
                            <ThermometerSun className="h-5 w-5 text-gray-400 mr-2" />
                            <input
                              type="number"
                              placeholder="Min"
                              value={plantConfigs[plantId].tempMin}
                              onChange={(e) => updatePlantConfig(plantId, 'tempMin', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <span className="text-gray-400">até</span>
                          <div className="flex-1 flex items-center">
                            <ThermometerSun className="h-5 w-5 text-gray-400 mr-2" />
                            <input
                              type="number"
                              placeholder="Max"
                              value={plantConfigs[plantId].tempMax}
                              onChange={(e) => updatePlantConfig(plantId, 'tempMax', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notas
                        </label>
                        <textarea
                          value={plantConfigs[plantId].notes}
                          onChange={(e) => updatePlantConfig(plantId, 'notes', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {selectedPlants.size} plantas selecionadas
            </div>
            <div className="flex gap-3">
              {step === 'configuration' ? (
                <>
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAddPlants}
                    disabled={selectedPlants.size === 0}
                  >
                    Adicionar {selectedPlants.size > 0 ? `(${selectedPlants.size})` : ''}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={selectedPlants.size === 0}
                  >
                    Próximo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlantModal;