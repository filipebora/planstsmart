import React, { useState } from 'react';
import { AlertTriangle, Search, ArrowRight, Leaf, Droplet, Sun, Bug } from 'lucide-react';

const emergencyGuides = [
  {
    id: 1,
    title: 'Planta Murcha',
    icon: <Droplet className="h-6 w-6 text-blue-500" />,
    symptoms: [
      'Folhas caídas',
      'Textura mole',
      'Solo seco'
    ],
    quickActions: [
      'Verifique a umidade do solo',
      'Regue imediatamente se estiver seco',
      'Evite luz solar direta'
    ],
    prevention: [
      'Estabeleça uma rotina de rega',
      'Use um medidor de umidade',
      'Observe os sinais da planta'
    ]
  },
  {
    id: 2,
    title: 'Folhas Amareladas',
    icon: <Leaf className="h-6 w-6 text-yellow-500" />,
    symptoms: [
      'Descoloração das folhas',
      'Manchas amarelas',
      'Queda de folhas'
    ],
    quickActions: [
      'Verifique a frequência de rega',
      'Ajuste a exposição à luz',
      'Remova folhas muito afetadas'
    ],
    prevention: [
      'Mantenha equilíbrio na rega',
      'Posicione adequadamente',
      'Monitore a nutrição'
    ]
  },
  {
    id: 3,
    title: 'Queimadura Solar',
    icon: <Sun className="h-6 w-6 text-red-500" />,
    symptoms: [
      'Manchas marrons nas folhas',
      'Bordas ressecadas',
      'Descoloração'
    ],
    quickActions: [
      'Mova para sombra parcial',
      'Aumente a umidade',
      'Remova partes danificadas'
    ],
    prevention: [
      'Aclimatação gradual ao sol',
      'Use cortinas ou filtros',
      'Conheça as necessidades de luz'
    ]
  },
  {
    id: 4,
    title: 'Pragas',
    icon: <Bug className="h-6 w-6 text-green-500" />,
    symptoms: [
      'Pequenos insetos',
      'Teias',
      'Manchas nas folhas'
    ],
    quickActions: [
      'Isole a planta afetada',
      'Use água com sabão neutro',
      'Aplique óleo de neem'
    ],
    prevention: [
      'Inspeção regular',
      'Boa ventilação',
      'Limpeza das folhas'
    ]
  }
];

const EmergencyGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<typeof emergencyGuides[0] | null>(null);

  const filteredGuides = emergencyGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <AlertTriangle className="h-7 w-7 text-red-500 mr-2" />
          Guia de Emergência
        </h2>
        <p className="text-gray-600 mt-1">Soluções rápidas para problemas comuns</p>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar sintomas ou problemas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guide List */}
        <div className="space-y-4">
          {filteredGuides.map(guide => (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`w-full text-left p-4 rounded-xl transition-colors ${
                selectedGuide?.id === guide.id
                  ? 'bg-red-50 border-2 border-red-200'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {guide.icon}
                  <span className="ml-3 font-medium text-gray-900">{guide.title}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {guide.symptoms.slice(0, 2).join(' • ')}
                  {guide.symptoms.length > 2 ? ' • ...' : ''}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Guide Details */}
        {selectedGuide && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              {selectedGuide.icon}
              <h3 className="text-xl font-semibold ml-3">{selectedGuide.title}</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sintomas</h4>
                <ul className="space-y-2">
                  {selectedGuide.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ações Imediatas</h4>
                <ul className="space-y-2">
                  {selectedGuide.quickActions.map((action, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Prevenção</h4>
                <ul className="space-y-2">
                  {selectedGuide.prevention.map((tip, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyGuide;