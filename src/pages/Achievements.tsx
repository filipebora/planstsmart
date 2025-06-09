import React from 'react';
import { Award, Trophy, Star, Leaf, Calendar, Heart, Target, BookOpen } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Jardineiro Iniciante',
    description: 'Adicionou sua primeira planta',
    icon: <Leaf className="h-6 w-6 text-green-500" />,
    progress: 100,
    completed: true,
    reward: 'Badge Iniciante'
  },
  {
    id: 2,
    title: 'Colecionador',
    description: 'Possui 10 plantas diferentes',
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    progress: 30,
    completed: false,
    reward: 'Badge Colecionador'
  },
  {
    id: 3,
    title: 'Mestre da Rega',
    description: 'Manteve a rotina de rega por 30 dias',
    icon: <Calendar className="h-6 w-6 text-blue-500" />,
    progress: 80,
    completed: false,
    reward: 'Badge Dedicação'
  },
  {
    id: 4,
    title: 'Doutor das Plantas',
    description: 'Recuperou uma planta doente',
    icon: <Target className="h-6 w-6 text-red-500" />,
    progress: 100,
    completed: true,
    reward: 'Badge Curador'
  },
  {
    id: 5,
    title: 'Botânico Expert',
    description: 'Identificou 20 espécies diferentes',
    icon: <BookOpen className="h-6 w-6 text-purple-500" />,
    progress: 45,
    completed: false,
    reward: 'Badge Conhecimento'
  },
  {
    id: 6,
    title: 'Jardineiro Social',
    description: 'Fez 10 posts no PlanTalks',
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    progress: 60,
    completed: false,
    reward: 'Badge Social'
  }
];

const Achievements: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Trophy className="h-7 w-7 text-yellow-500 mr-2" />
          Conquistas
        </h2>
        <p className="text-gray-600 mt-1">Acompanhe seu progresso e desbloqueie recompensas</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-6 text-white">
          <Award className="h-8 w-8 mb-4" />
          <h3 className="text-2xl font-bold">2</h3>
          <p className="text-yellow-100">Conquistas Completadas</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <Star className="h-8 w-8 mb-4" />
          <h3 className="text-2xl font-bold">63%</h3>
          <p className="text-purple-100">Progresso Total</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <Trophy className="h-8 w-8 mb-4" />
          <h3 className="text-2xl font-bold">4</h3>
          <p className="text-green-100">Próximas Conquistas</p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`bg-white rounded-xl shadow-sm p-6 ${
              achievement.completed ? 'border-2 border-yellow-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  achievement.completed ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  {achievement.icon}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
              {achievement.completed && (
                <Trophy className="h-6 w-6 text-yellow-500" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progresso</span>
                <span className="font-medium">{achievement.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    achievement.completed
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Recompensa:</span>
                <span className={`font-medium ${
                  achievement.completed ? 'text-yellow-500' : 'text-gray-600'
                }`}>
                  {achievement.reward}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;