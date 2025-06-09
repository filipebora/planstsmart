import React from 'react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: "Bora ",
    role: "fez o site todo",
    image: "https://production-livingdocs-bluewin-ch.imgix.net/2021/1/11/639f4195-44f8-4896-98ad-e1a23c1a52b9.jpeg?w=994&auto=format", 
    contribution: "Desenvolveu TUDO",
    github: "",
    linkedin: "",
    email: "",
    auraColor: "from-purple-500/20 to-blue-500/20"
  },
  {
    name: "Pedro rocha",
    role: "O resolvedor",
    image: "https://ath2.unileverservices.com/wp-content/uploads/sites/2/2020/11/18072858/como-ser-careca-e-estiloso.jpg",
    contribution: "Taca na mão dele que ele resolve 🔥 amigos?",
    github: "",
    linkedin: "",
    email: "",
    auraColor: "from-green-500/20 to-emerald-500/20"
  },
  {
    name: "Guilherme",
    role: "A cabeça pensante",
    image: "https://preview.redd.it/clark-kent-christopher-reeve-v0-qsjuz5xn5nce1.jpeg?width=640&crop=smart&auto=webp&s=8facbe84b43c755686df7a55ff00b128a98ee941",
    contribution: "Teve um papel crucial por trás da midia, mas não tem porcentagem alguma da empresa pois só quer os pontos em ps",
    github: "/",
    linkedin: "",
    email: "",
    auraColor: "from-amber-500/20 to-orange-500/20"
  },
  {
    name: "Daniel Alves", 
    role: "o mais temido",
    image: "https://blogabre.com.br/wp-content/uploads/2022/04/wepik-2022329-101039-e1651238028955-1024x784.jpg",
    contribution: "Não mexa com a tropa da plantsmart ou ele te punirá",
    github: "",
    linkedin: "",
    email: "",
    auraColor: "from-red-500/20 to-pink-500/20"
  },
  {
    name: "davi",
    role: "Testador de verdes",
    image: "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco/blog/wordpress/prod/sites/7/2024/03/18150809/AdobeStock_71938541-1.jpg",
    contribution: "fumou todo o estoque de plantas",
    github: "",
    linkedin: "r",
    email: "",
    auraColor: "from-teal-500/20 to-cyan-500/20"
  },
  {
    name: "Rafael caetano",
    role: "Chefe do renatinho",
    image: "https://mbird.com/wp-content/uploads/2013/12/lbj1.jpg",
    contribution: "Ánalisou e resolvou problemas chatos do app",
    github: "",
    linkedin: "",
    email: "",
    auraColor: "from-indigo-500/20 to-violet-500/20"
  },
  {
    name: "magrelo (20y)",
    role: "nao faz nada",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRB3QRJeNLKagxagZnkk4_7kRcdjlT04ZNQ&s",
    contribution: "nao importa o que voce faça, ele vai reclamar 💀",
    github: "",
    linkedin: "",
    email: "",
    auraColor: "from-rose-500/20 to-pink-500/20"
  }
];

const Credits: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-48 h-48 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
          </div>
          <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nossa Equipe</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os talentosos profissionais por trás do PlantSmart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-xl">
                <div className={`w-full h-full bg-gradient-to-br ${member.auraColor}`}></div>
              </div>
              
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 -mt-12 mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-green-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {member.contribution}
                </p>
                
                <div className="flex space-x-4 pt-4 border-t border-gray-100">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;