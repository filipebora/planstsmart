import React, { useState } from 'react';
import { Heart, Search, Filter, Plus, X, Check } from 'lucide-react';
import { plantDatabase } from '../data/plantDatabase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const PlantWishlist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [wishlist, setWishlist] = useState<typeof plantDatabase>([]);

  const handleAddToWishlist = (plant: typeof plantDatabase[0]) => {
    setWishlist(prev => [...prev, plant]);
    setShowAddModal(false);
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(plant => plant.id !== id));
  };

  const availablePlants = plantDatabase.filter(
    plant => !wishlist.some(w => w.id === plant.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Wishlist</h2>
          <p className="text-gray-600 mt-1">Plantas que você deseja ter</p>
        </div>
        
        <Button
          variant="primary"
          icon={<Plus className="h-5 w-5" />}
          onClick={() => setShowAddModal(true)}
        >
          Adicionar à Wishlist
        </Button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(plant => (
          <div
            key={plant.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden group"
          >
            <div className="aspect-square relative">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveFromWishlist(plant.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
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

      {/* Add to Wishlist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Adicionar à Wishlist</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar plantas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                {availablePlants
                  .filter(plant =>
                    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(plant => (
                    <div
                      key={plant.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4"
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{plant.name}</h4>
                        <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                        <button
                          onClick={() => handleAddToWishlist(plant)}
                          className="mt-2 flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {wishlist.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
            <Heart className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Sua wishlist está vazia</h3>
          <p className="text-gray-600">
            Adicione plantas que você deseja ter na sua coleção
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantWishlist;