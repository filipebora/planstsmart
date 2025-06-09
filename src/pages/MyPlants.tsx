import React, { useState } from 'react';
import { usePlants } from '../contexts/PlantContext';
import PlantCard from '../components/PlantCard';
import { Search, Filter, Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const MyPlants: React.FC = () => {
  const { plants } = usePlants();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'healthy' | 'warning' | 'critical'>('all');
  const navigate = useNavigate();

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.species.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'healthy':
        return plant.healthScore >= 80;
      case 'warning':
        return plant.healthScore >= 60 && plant.healthScore < 80;
      case 'critical':
        return plant.healthScore < 60;
      default:
        return true;
    }
  });

  const handlePlantClick = (id: string) => {
    navigate(`/plantas/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Minhas Plantas</h2>
          <p className="text-gray-600 mt-1">Gerencie suas plantas e monitore sua saúde</p>
        </div>

        <Button variant="primary" className="mt-4 md:mt-0">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Planta
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
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
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="healthy">Saudáveis</option>
              <option value="warning">Atenção</option>
              <option value="critical">Críticas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlants.map(plant => (
          <PlantCard key={plant.id} plant={plant} onClick={handlePlantClick} />
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhuma planta encontrada</p>
          {searchTerm && (
            <p className="text-gray-400 mt-2">
              Tente ajustar seus filtros ou termos de busca
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPlants