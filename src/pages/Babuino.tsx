import React, { useState } from 'react';
import { Sparkles, Send, Eraser, Brain, History, Save, Download } from 'lucide-react';
import Button from '../components/ui/Button';

const Babuino: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  
  const mockConversation = [
    {
      role: 'assistant',
      content: 'Olá! Eu sou o Babuino, sua IA especialista em macacadas. Como posso ajudar hoje?',
      timestamp: new Date().toISOString(),
    },
    {
      role: 'user',
      content: 'Me fale sobre bananas 🍌',
      timestamp: new Date().toISOString(),
    },
    {
      role: 'assistant',
      content: 'Ah, bananas! 🍌 A fruta preferida de todo renatinho que se preze! Sabia que nós babuínos conseguimos descascar uma banana em menos de 2 segundos? É tipo um superpoder primata! 🐒',
      timestamp: new Date().toISOString(),
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="heading-1 flex items-center">
            <Brain className="h-8 w-8 text-purple-600 mr-2" />
            Babuino AI
          </h1>
          <p className="text-body mt-1">Sua IA especialista em macacadas 🐒</p>
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" icon={<History className="h-4 w-4" />}>
            Histórico
          </Button>
          <Button variant="outline" size="sm" icon={<Save className="h-4 w-4" />}>
            Salvar Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="section min-h-[600px] flex flex-col">
            <div className="flex-1 space-y-6 mb-4">
              {mockConversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'assistant'
                        ? 'bg-purple-50 text-purple-900'
                        : 'bg-green-50 text-green-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-50 mt-2 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Digite sua mensagem para o Babuino..."
                className="input min-h-[100px] pr-24 resize-none"
              />
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Eraser className="h-5 w-5" />
                </button>
                <button className="p-2 text-purple-600 hover:text-purple-700">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="section">
            <h3 className="heading-3 flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
              Sugestões
            </h3>
            <div className="space-y-2">
              {[
                "Como fazer macaquices avançadas? 🐒",
                "Me ensine a pular de galho em galho 🌴",
                "Qual a melhor técnica para descascar banana? 🍌",
                "Como impressionar outros babuínos? 💪"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <h3 className="heading-3 flex items-center mb-4">
              <Download className="h-5 w-5 text-green-600 mr-2" />
              Downloads
            </h3>
            <div className="space-y-2">
              {[
                { name: "Manual do Babuíno.pdf", size: "2.3 MB" },
                { name: "Truques Primatas.pdf", size: "1.8 MB" },
                { name: "Macacadas_101.pdf", size: "3.1 MB" }
              ].map((file, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
                >
                  <span className="text-gray-700">{file.name}</span>
                  <span className="text-gray-400">{file.size}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Babuino;