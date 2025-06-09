import React, { useState } from 'react';
import { Search, Filter, Leaf, Droplet, Sun, ThermometerSun, X, Heart, Share2, Plus } from 'lucide-react';
import Button from '../components/ui/Button';

// Expanded plant database with many species
const plantDatabase = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    difficulty: 'Moderada',
    light: 'Indireta brilhante',
    water: 'Moderada',
    temperature: '18-30°C',
    description: 'Também conhecida como costela-de-adão, é uma planta tropical que se destaca por suas folhas grandes e perfuradas.',
    category: 'Tropical',
    careInstructions: [
      'Regar quando o solo estiver parcialmente seco',
      'Manter em ambiente úmido',
      'Evitar luz solar direta',
      'Adubar a cada 2-3 meses'
    ],
    commonProblems: [
      'Folhas amareladas podem indicar excesso de água',
      'Folhas sem perfurações podem indicar pouca luz',
      'Pontas marrons podem indicar baixa umidade'
    ]
  },
  {
    id: '2',
    name: 'Samambaiaa',
    scientificName: 'Samambaia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzncc_sXzd31hqsY1J1GOuZO49DNzTySAM8w&s',
    difficulty: 'Impossivel',
    light: 'Abusado',
    water: 'Leite',
    temperature: '34-40°C',
    description: 'Conhecida por seu espirito penetrante ',
    category: 'Interior',
    careInstructions: [
      'Regar diariamente',
      'Manter em ambiente',
      'Evitar contato com pessoas sensíveis',
      'Não adubar nunca'
    ],
    commonProblems: [
      'Pode causar problemas de relacionamento',
      'Tendência a ser muito abusada',
      'Difícil de controlar'
    ]
  },
  {
    id: '3',
    name: 'Orquídea Phalaenopsis',
    scientificName: 'Phalaenopsis sp.',
    image: 'https://images.pexels.com/photos/4273440/pexels-photo-4273440.jpeg',
    difficulty: 'Moderada',
    light: 'Indireta brilhante',
    water: 'Moderada',
    temperature: '20-30°C',
    description: 'Uma das orquídeas mais populares, conhecida por suas flores duradouras e coloridas.',
    category: 'Flores',
    careInstructions: [
      'Regar quando o substrato estiver seco',
      'Manter em ambiente bem ventilado',
      'Proteger de luz solar direta',
      'Adubar quinzenalmente durante o crescimento'
    ],
    commonProblems: [
      'Botões podem cair por mudanças bruscas',
      'Raízes podem apodrecer com excesso de água',
      'Folhas amareladas indicam excesso de luz'
    ]
  },
  {
    id: '4',
    name: 'Espada de São Jorge',
    scientificName: 'Sansevieria trifasciata',
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    difficulty: 'Fácil',
    light: 'Baixa a alta',
    water: 'Baixa',
    temperature: '15-35°C',
    description: 'Planta resistente e versátil, excelente para purificar o ar.',
    category: 'Interior',
    careInstructions: [
      'Regar apenas quando o solo estiver bem seco',
      'Tolera diferentes níveis de luz',
      'Não necessita de poda frequente',
      'Adubar a cada 3 meses'
    ],
    commonProblems: [
      'Folhas moles indicam excesso de água',
      'Manchas marrons por queimadura do sol',
      'Crescimento lento em pouca luz'
    ]
  },
  {
    id: '5',
    name: 'Samambaia Americana',
    scientificName: 'Nephrolepis exaltata',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    difficulty: 'Moderada',
    light: 'Indireta',
    water: 'Moderada a alta',
    temperature: '18-24°C',
    description: 'Samambaia clássica com folhas delicadas e abundantes.',
    category: 'Samambaias',
    careInstructions: [
      'Manter o solo sempre úmido',
      'Evitar luz solar direta',
      'Borrifar água nas folhas',
      'Adubar mensalmente'
    ],
    commonProblems: [
      'Folhas secas indicam baixa umidade',
      'Amarelamento por excesso de luz',
      'Queda de folhas no inverno'
    ]
  },
  {
    id: '6',
    name: 'Lírio da Paz',
    scientificName: 'Spathiphyllum wallisii',
    image: 'https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg',
    difficulty: 'Fácil',
    light: 'Baixa a moderada',
    water: 'Moderada',
    temperature: '18-30°C',
    description: 'Planta elegante com flores brancas, ótima para ambientes internos.',
    category: 'Flores',
    careInstructions: [
      'Manter solo levemente úmido',
      'Proteger de correntes de ar',
      'Remover flores murchas',
      'Adubar a cada 2 meses'
    ],
    commonProblems: [
      'Folhas amarelas por excesso de água',
      'Pontas marrons por baixa umidade',
      'Ausência de flores por pouca luz'
    ]
  },
  {
    id: '7',
    name: 'Ficus Lyrata',
    scientificName: 'Ficus lyrata',
    image: 'https://images.pexels.com/photos/6957650/pexels-photo-6957650.jpeg',
    difficulty: 'Moderada',
    light: 'Indireta brilhante',
    water: 'Moderada',
    temperature: '18-28°C',
    description: 'Conhecida por suas grandes folhas em forma de violino.',
    category: 'Tropical',
    careInstructions: [
      'Regar quando o solo estiver seco',
      'Manter em local com boa luminosidade',
      'Limpar as folhas regularmente',
      'Adubar a cada 2 meses'
    ],
    commonProblems: [
      'Queda de folhas por mudança de ambiente',
      'Manchas marrons por água nas folhas',
      'Crescimento lento em pouca luz'
    ]
  },
  {
    id: '8',
    name: 'Palmeira Ráfis',
    scientificName: 'Rhapis excelsa',
    image: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg',
    difficulty: 'Moderada',
    light: 'Indireta',
    water: 'Moderada',
    temperature: '15-28°C',
    description: 'Palmeira elegante e resistente para ambientes internos.',
    category: 'Palmeiras',
    careInstructions: [
      'Regar moderadamente',
      'Proteger de luz solar direta',
      'Manter em ambiente úmido',
      'Adubar trimestralmente'
    ],
    commonProblems: [
      'Pontas secas por baixa umidade',
      'Amarelamento por excesso de água',
      'Crescimento lento natural'
    ]
  },
  {
    id: '9',
    name: 'Cacto São Pedro',
    scientificName: 'Echinopsis pachanoi',
    image: 'https://images.pexels.com/photos/1903965/pexels-photo-1903965.jpeg',
    difficulty: 'Fácil',
    light: 'Direta',
    water: 'Baixa',
    temperature: '15-35°C',
    description: 'Cacto colunar de crescimento rápido e baixa manutenção.',
    category: 'Suculentas',
    careInstructions: [
      'Regar apenas quando o solo estiver seco',
      'Expor ao sol direto',
      'Usar solo bem drenado',
      'Adubar minimamente'
    ],
    commonProblems: [
      'Apodrecimento por excesso de água',
      'Crescimento irregular por falta de luz',
      'Manchas por queimadura de sol súbita'
    ]
  },
  {
    id: '10',
    name: 'Begônia Maculata',
    scientificName: 'Begonia maculata',
    image: 'https://images.pexels.com/photos/6597437/pexels-photo-6597437.jpeg',
    difficulty: 'Moderada',
    light: 'Indireta brilhante',
    water: 'Moderada',
    temperature: '18-25°C',
    description: 'Begônia com folhas pontilhadas distintivas.',
    category: 'Interior',
    careInstructions: [
      'Manter solo levemente úmido',
      'Evitar molhar as folhas',
      'Proteger de correntes de ar',
      'Adubar mensalmente'
    ],
    commonProblems: [
      'Manchas nas folhas por água',
      'Queda de folhas por frio',
      'Murchamento por baixa umidade'
    ]
  },
  {
    id: '11',
    name: 'Alocasia Amazônica',
    scientificName: 'Alocasia × amazonica',
    image: 'https://images.pexels.com/photos/6597443/pexels-photo-6597443.jpeg',
    difficulty: 'Difícil',
    light: 'Indireta brilhante',
    water: 'Moderada',
    temperature: '20-30°C',
    description: 'Planta tropical com folhas dramáticas em forma de seta.',
    category: 'Tropical',
    careInstructions: [
      'Manter umidade constante',
      'Evitar luz solar direta',
      'Proteger de correntes de ar',
      'Adubar regularmente'
    ],
    commonProblems: [
      'Amarelamento por excesso de água',
      'Bordas secas por baixa umidade',
      'Dormência no inverno'
    ]
  },
  {
    id: '12',
    name: 'Calathea Orbifolia',
    scientificName: 'Calathea orbifolia',
    image: 'https://images.pexels.com/photos/6597455/pexels-photo-6597455.jpeg',
    difficulty: 'Difícil',
    light: 'Indireta',
    water: 'Alta',
    temperature: '18-25°C',
    description: 'Calathea com folhas grandes e listradas.',
    category: 'Tropical',
    careInstructions: [
      'Manter alta umidade',
      'Usar água filtrada',
      'Evitar luz direta',
      'Adubar com moderação'
    ],
    commonProblems: [
      'Folhas enroladas por baixa umidade',
      'Manchas por água com cloro',
      'Bordas marrons por luz forte'
    ]
  },
  {
    id: '13',
    name: 'Jiboia',
    scientificName: 'Epipremnum aureum',
    image: 'https://images.pexels.com/photos/6597461/pexels-photo-6597461.jpeg',
    difficulty: 'Fácil',
    light: 'Baixa a moderada',
    water: 'Moderada',
    temperature: '15-30°C',
    description: 'Planta trepadeira versátil e fácil de cuidar.',
    category: 'Trepadeiras',
    careInstructions: [
      'Regar quando o solo estiver seco',
      'Adapta-se a pouca luz',
      'Podar para controlar crescimento',
      'Adubar a cada 3 meses'
    ],
    commonProblems: [
      'Folhas pequenas por pouca luz',
      'Amarelamento por excesso de água',
      'Crescimento lento no inverno'
    ]
  },
  {
    id: '14',
    name: 'Filodendro Brasil',
    scientificName: 'Philodendron hederaceum',
    image: 'https://images.pexels.com/photos/6597467/pexels-photo-6597467.jpeg',
    difficulty: 'Fácil',
    light: 'Indireta',
    water: 'Moderada',
    temperature: '18-30°C',
    description: 'Filodendro com folhas variegadas em verde e amarelo.',
    category: 'Trepadeiras',
    careInstructions: [
      'Manter solo levemente úmido',
      'Fornecer suporte para trepar',
      'Evitar luz solar direta',
      'Adubar a cada 2 meses'
    ],
    commonProblems: [
      'Perda de variegação por pouca luz',
      'Folhas amarelas por excesso de água',
      'Crescimento irregular sem suporte'
    ]
  },
  {
    id: '15',
    name: 'Peperômia Melancia',
    scientificName: 'Peperomia argyreia',
    image: 'https://images.pexels.com/photos/6597473/pexels-photo-6597473.jpeg',
    difficulty: 'Fácil',
    light: 'Indireta',
    water: 'Baixa a moderada',
    temperature: '18-26°C',
    description: 'Pequena planta com folhas que lembram uma melancia.',
    category: 'Interior',
    careInstructions: [
      'Regar com moderação',
      'Evitar encharcamento',
      'Proteger de luz direta',
      'Adubar levemente'
    ],
    commonProblems: [
      'Folhas murchas por falta de água',
      'Apodrecimento por excesso de água',
      'Descoloração por luz forte'
    ]
  }
];

const PlantDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState<typeof plantDatabase[0] | null>(null);

  const categories = Array.from(new Set(plantDatabase.map(plant => plant.category)));

  const filteredPlants = plantDatabase.filter(plant => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || plant.category === categoryFilter;
    
    const matchesDifficulty = filter === 'all' || 
      (filter === 'easy' && plant.difficulty === 'Fácil') ||
      (filter === 'moderate' && plant.difficulty === 'Moderada') ||
      (filter === 'difficult' && plant.difficulty === 'Difícil');

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Banco de Plantas</h2>
        <p className="text-gray-600 mt-1">Explore nossa biblioteca de espécies de plantas</p>
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

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todas as dificuldades</option>
                <option value="easy">Fácil manutenção</option>
                <option value="moderate">Manutenção moderada</option>
                <option value="difficult">Manutenção difícil</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Leaf className="text-gray-400 h-5 w-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map(plant => (
          <div
            key={plant.id}
            onClick={() => setSelectedPlant(plant)}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="h-48 relative">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-semibold">{plant.name}</h3>
                <p className="text-gray-200 text-sm italic">{plant.scientificName}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {plant.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  plant.difficulty === 'Fácil' 
                    ? 'bg-green-100 text-green-800'
                    : plant.difficulty === 'Moderada'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {plant.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm text-gray-600">{plant.light}</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">{plant.water}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <ThermometerSun className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm text-gray-600">{plant.temperature}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plant Details Overlay */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedPlant.image}
                alt={selectedPlant.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold text-white">{selectedPlant.name}</h2>
                <p className="text-gray-200 italic">{selectedPlant.scientificName}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {selectedPlant.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedPlant.difficulty === 'Fácil'
                    ? 'bg-green-100 text-green-800'
                    : selectedPlant.difficulty === 'Moderada'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedPlant.difficulty}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{selectedPlant.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Instruções de Cuidado</h3>
                  <ul className="space-y-2">
                    {selectedPlant.careInstructions?.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-600">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Problemas Comuns</h3>
                  <ul className="space-y-2">
                    {selectedPlant.commonProblems?.map((problem, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-600">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  icon={<Heart className="h-5 w-5" />}
                >
                  Favoritar
                </Button>
                <Button
                  variant="outline"
                  icon={<Share2 className="h-5 w-5" />}
                >
                  Compartilhar
                </Button>
                <Button
                  variant="primary"
                  icon={<Plus className="h-5 w-5" />}
                >
                  Adicionar à Minha Coleção
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
            <Leaf className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma planta encontrada</h3>
          <p className="text-gray-600">
            Tente ajustar seus filtros ou termos de busca
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantDatabase;