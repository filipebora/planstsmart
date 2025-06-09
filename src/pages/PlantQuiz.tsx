import React, { useState } from 'react';
import { HelpCircle, ArrowRight, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { plantDatabase } from '../data/plantDatabase';

const questions = [
  {
    id: 1,
    question: 'Quanto tempo você tem disponível para cuidar das plantas?',
    options: [
      { id: 'a', text: 'Muito pouco, preciso de algo que exija pouca manutenção', score: { easy: 3, moderate: 0, difficult: 0 } },
      { id: 'b', text: 'Tenho um tempo razoável para cuidados básicos', score: { easy: 1, moderate: 2, difficult: 0 } },
      { id: 'c', text: 'Bastante tempo, adoro me dedicar às plantas', score: { easy: 0, moderate: 1, difficult: 3 } }
    ]
  },
  {
    id: 2,
    question: 'Como é a iluminação no seu ambiente?',
    options: [
      { id: 'a', text: 'Pouca luz natural', score: { lowLight: 3, mediumLight: 0, highLight: 0 } },
      { id: 'b', text: 'Luz indireta moderada', score: { lowLight: 1, mediumLight: 3, highLight: 1 } },
      { id: 'c', text: 'Muita luz natural direta', score: { lowLight: 0, mediumLight: 1, highLight: 3 } }
    ]
  },
  {
    id: 3,
    question: 'Você tem experiência com plantas?',
    options: [
      { id: 'a', text: 'Sou iniciante total', score: { easy: 3, moderate: 0, difficult: 0 } },
      { id: 'b', text: 'Tenho alguma experiência', score: { easy: 1, moderate: 2, difficult: 1 } },
      { id: 'c', text: 'Sou experiente', score: { easy: 0, moderate: 1, difficult: 3 } }
    ]
  },
  {
    id: 4,
    question: 'Qual o principal objetivo com sua planta?',
    options: [
      { id: 'a', text: 'Decoração', score: { aesthetic: 3, air: 1, collection: 0 } },
      { id: 'b', text: 'Purificação do ar', score: { aesthetic: 1, air: 3, collection: 0 } },
      { id: 'c', text: 'Coleção botânica', score: { aesthetic: 0, air: 1, collection: 3 } }
    ]
  },
  {
    id: 5,
    question: 'Como é o clima da sua região?',
    options: [
      { id: 'a', text: 'Geralmente seco', score: { drought: 3, humid: 0 } },
      { id: 'b', text: 'Equilibrado', score: { drought: 1, humid: 1 } },
      { id: 'c', text: 'Bastante úmido', score: { drought: 0, humid: 3 } }
    ]
  }
];

const PlantQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedPlants, setRecommendedPlants] = useState<typeof plantDatabase>([]);

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Mock calculation - in a real app, this would be more sophisticated
    const easyPlants = plantDatabase.filter(p => p.difficulty === 'Fácil').slice(0, 3);
    setRecommendedPlants(easyPlants);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedPlants([]);
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
          <HelpCircle className="h-7 w-7 text-green-500 mr-2" />
          Que planta combina com você?
        </h2>
        <p className="text-gray-600 mt-1">
          Responda algumas perguntas para descobrir as plantas ideais para você
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Questão {currentQuestion + 1} de {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {question.question}
            </h3>
            
            <div className="space-y-4">
              {question.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3"></div>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Encontramos suas plantas ideais!
            </h3>
            <p className="text-gray-600">
              Com base nas suas respostas, estas são as plantas que mais combinam com você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedPlants.map(plant => (
              <div key={plant.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{plant.name}</h4>
                  <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                  <p className="text-sm text-gray-600 mt-2">{plant.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={restartQuiz}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Refazer Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantQuiz;