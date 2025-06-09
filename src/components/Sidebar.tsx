import React, { useState } from 'react';
import { Home, Plane as Plant, CloudRain, AlertTriangle, Database, Brain, Crown, Users, MessageCircle, Heart, Ambulance, Award, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/Button';
import AddPlantModal from './AddPlantModal';
import { usePlants } from '../contexts/PlantContext';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  alert?: boolean;
  isPremium?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, alert = false, isPremium = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-green-50 text-green-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="relative">
        {icon}
        {alert && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </div>
      <span className="ml-3 font-medium">{label}</span>
      {isPremium && (
        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-800">
          Premium
        </span>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addPlant } = usePlants();

  const handleAddPlant = (plant: any) => {
    addPlant(plant);
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <Button 
            variant="primary"
            fullWidth
            icon={<Plant className="h-5 w-5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar Planta
          </Button>
        </div>
        
        <nav className="space-y-1">
          <SidebarItem icon={<Home className="h-5 w-5" />} label="Início" to="/" />
          <SidebarItem icon={<Plant className="h-5 w-5" />} label="Minhas Plantas" to="/plantas" />
          <SidebarItem icon={<CloudRain className="h-5 w-5" />} label="Agenda de Rega" to="/agenda" />
          <SidebarItem icon={<AlertTriangle className="h-5 w-5" />} label="Alertas de Saúde" to="/alertas" alert />
          <SidebarItem icon={<Database className="h-5 w-5" />} label="Banco de Plantas" to="/banco" />
          <SidebarItem icon={<Brain className="h-5 w-5" />} label="Babuino IA" to="/babuino" />
          <SidebarItem icon={<Crown className="h-5 w-5" />} label="Premium" to="/premium" isPremium />
          <SidebarItem icon={<MessageCircle className="h-5 w-5" />} label="PlanTalks" to="/plantalks" />
          <SidebarItem icon={<Heart className="h-5 w-5" />} label="Wishlist" to="/wishlist" />
          <SidebarItem icon={<Ambulance className="h-5 w-5" />} label="Guia de Emergência" to="/emergencia" />
          <SidebarItem icon={<HelpCircle className="h-5 w-5" />} label="Quiz" to="/quiz" />
          <SidebarItem icon={<Award className="h-5 w-5" />} label="Conquistas" to="/conquistas" />
          <SidebarItem icon={<Users className="h-5 w-5" />} label="Créditos" to="/creditos" />
        </nav>
      </aside>

      <AddPlantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPlant}
      />
    </>
  );
};

export default Sidebar;