import React, { useState } from 'react';
import { usePlants } from '../contexts/PlantContext';
import { 
  ArrowLeft, 
  Droplet, 
  Sun, 
  ThermometerSun, 
  Wind, 
  Calendar, 
  Edit3, 
  Trash2, 
  Share2,
  Leaf,
  X,
  Save
} from 'lucide-react';
import HealthIndicator from '../components/ui/HealthIndicator';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

type PlantDetailProps = {
  plantId: string;
  onBack: () => void;
};

const PlantDetail: React.FC<PlantDetailProps> = ({ plantId, onBack }) => {
  const { getPlantById, updatePlant, deletePlant } = usePlants();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const plant = getPlantById(plantId);
  const [editedPlant, setEditedPlant] = useState(plant);
  
  if (!plant) {
    return <div>Plant not found</div>;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const capitalizeFirstLetter = (text: string | undefined) => {
    if (!text) return 'N/A';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPlant(plant);
  };

  const handleSave = async () => {
    try {
      await updatePlant(editedPlant);
      setIsEditing(false);
      toast.success('Plant updated successfully!');
    } catch (error) {
      toast.error('Failed to update plant');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPlant(plant);
  };

  const handleDelete = async () => {
    try {
      await deletePlant(plantId);
      toast.success('Plant deleted successfully!');
      onBack();
    } catch (error) {
      toast.error('Failed to delete plant');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedPlant(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back to dashboard</span>
      </button>
      
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="h-64 relative">
          <img 
            src={isEditing ? editedPlant.image : plant.image} 
            alt={isEditing ? editedPlant.name : plant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            {isEditing ? (
              <input
                type="text"
                value={editedPlant.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-3xl font-bold bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-white"
              />
            ) : (
              <h1 className="text-3xl font-bold">{plant.name}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                value={editedPlant.species}
                onChange={(e) => handleInputChange('species', e.target.value)}
                className="text-gray-200 bg-transparent border-b border-white/30 focus:outline-none focus:border-white"
              />
            ) : (
              <p className="text-gray-200">{plant.species}</p>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Health Status</h2>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editedPlant.healthScore}
                  onChange={(e) => handleInputChange('healthScore', parseInt(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />
              ) : (
                <HealthIndicator score={plant.healthScore} size="lg" />
              )}
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Care Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Droplet className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Watering</p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedPlant.wateringFrequency}
                        onChange={(e) => handleInputChange('wateringFrequency', parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">Every {plant.wateringFrequency} days</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Sun className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Light</p>
                    {isEditing ? (
                      <select
                        value={editedPlant.lightRequirement}
                        onChange={(e) => handleInputChange('lightRequirement', e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-600">{capitalizeFirstLetter(plant.lightRequirement)} light required</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Wind className="h-5 w-5 text-teal-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Humidity</p>
                    {isEditing ? (
                      <select
                        value={editedPlant.humidity}
                        onChange={(e) => handleInputChange('humidity', e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-600">{capitalizeFirstLetter(plant.humidity)} humidity preferred</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ThermometerSun className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Temperature</p>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editedPlant.temperature.min}
                          onChange={(e) => handleInputChange('temperature', { ...editedPlant.temperature, min: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 border rounded"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          value={editedPlant.temperature.max}
                          onChange={(e) => handleInputChange('temperature', { ...editedPlant.temperature, max: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 border rounded"
                        />
                        <span>°C</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">{plant.temperature.min}°C - {plant.temperature.max}°C</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3">Watering Schedule</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">Last watered</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="date"
                      value={new Date(editedPlant.lastWatered).toISOString().split('T')[0]}
                      onChange={(e) => handleInputChange('lastWatered', new Date(e.target.value).toISOString())}
                      className="px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="font-medium">{formatDate(plant.lastWatered)}</span>
                  )}
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Next watering</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="date"
                      value={new Date(editedPlant.nextWatering).toISOString().split('T')[0]}
                      onChange={(e) => handleInputChange('nextWatering', new Date(e.target.value).toISOString())}
                      className="px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="font-medium">{formatDate(plant.nextWatering)}</span>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Location</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedPlant.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Enter location"
                  />
                ) : (
                  <p className="text-gray-600">{plant.location || 'No location set'}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Notes</h3>
            {isEditing ? (
              <textarea
                value={editedPlant.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
                placeholder="Add notes about your plant..."
              />
            ) : (
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{plant.notes || 'No notes available'}</p>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-md font-semibold text-gray-800">AI Recommendations</h3>
            </div>
            <p className="mt-2 text-gray-600 bg-purple-50 p-4 rounded-lg">
              Based on recent data, your {plant.name} is doing well. To maintain optimal health, consider increasing humidity slightly as we approach drier months. The current watering schedule seems appropriate based on soil moisture readings.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Plant</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {plant.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDelete}
              >
                Delete Plant
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetail;