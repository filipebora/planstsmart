import React, { useState } from 'react';
import { Star, Check, Trophy, Users, Plane as Plant, Brain, X, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const PremiumFeatures = [
  {
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    title: "Sistema automatizado insano",
    description: "O magrelo falou que é facil de fazer 😂✌️"
  },
  {
    icon: <Plant className="h-6 w-6 text-green-500" />,
    title: "Plantas ilimitadas",
    description: "Veja todas suas plantas"
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: "Uso pra familia toda",
    description: "Tenha acesso a 5 usuários pra sua familia"
  }
];

const testimonials = [
  {
    name: "Osama",
    role: "Plantador ",
    image: "https://us.123rf.com/450wm/zurijeta/zurijeta1501/zurijeta150100593/35154062-perfil-do-homem-%C3%A1rabe.jpg?ver=6",
    content: "Amei, véi",
    rating: 5
  },
  {
    name: "Samambaia",
    role: "Planta",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzncc_sXzd31hqsY1J1GOuZO49DNzTySAM8w&s",
    content: "a versão premium é muito boa! Valeu cada centavo dos meus 9,99",
    rating: 5
  },
  {
    name: "Renatinho",
    role: "Sentador profissional",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDBh_3f4cRDY6QoCFZRYXj8KwQBtI9k1DSQ&s",
    content: "amigos?",
    rating: 5
  }
];

const Premium: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTroll, setShowTroll] = useState(false);
  const [seats, setSeats] = useState(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = () => {
    setShowCheckout(true);
  };

  const handleCheckoutClick = () => {
    setShowTroll(true);
  };

  const basePrice = 9.99;
  const yearlyDiscount = 0.25; // 25% off
  const totalPrice = seats * basePrice * (billingCycle === 'yearly' ? 12 * (1 - yearlyDiscount) : 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-1 mb-4">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium text-green-800">Premium Features</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Eleve sua experiência com sua plantas
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compre PlantSmart Premium e ganhe várias coisas!
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {PremiumFeatures.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="inline-block p-3 bg-gray-50 rounded-lg mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Affordable Pricing</h2>
          <p className="text-gray-600">Everything you need to become a plant care expert</p>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-baseline mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                <p className="text-gray-600">All features included</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-gray-900">R$9,99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                "AI-powered plant care recommendations",
                "Unlimited plant tracking",
                "Family sharing (up to 5 members)",
                "Premium support",
                "Early access to new features"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              variant="primary"
              fullWidth
              onClick={handleSubscribe}
              icon={<Trophy className="h-5 w-5" />}
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Amado por jardineiros
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Pronto pra transformar sua vida?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Venha conosco e compre plantsmart premium
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubscribe}
          icon={<Trophy className="h-6 w-6" />}
        >
          Compre agora
        </Button>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Upgrade to Professional</h3>
                <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of seats</label>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    className="p-2 border rounded-md hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{seats}</span>
                  <button 
                    onClick={() => setSeats(seats + 1)}
                    className="p-2 border rounded-md hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing cycle</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`p-3 border rounded-lg text-center ${
                      billingCycle === 'monthly' ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">Monthly</div>
                    <div className="text-sm text-gray-500">R${basePrice.toFixed(2)}/mo</div>
                  </button>
                  <button 
                    onClick={() => setBillingCycle('yearly')}
                    className={`p-3 border rounded-lg text-center ${
                      billingCycle === 'yearly' ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">Yearly</div>
                    <div className="text-sm text-gray-500">Save 25%</div>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R${totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card details</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onClick={handleCheckoutClick}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Agree and purchase
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                This is a secure 128-bit SSL encrypted payment
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Troll Modal */}
      {showTroll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden">
            <img 
              src="https://s2-g1.glbimg.com/9eGa93hMKP5NW06zzRTVmL6m_dQ=/0x0:1323x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/A/a/qCVlktQA2ByjAV2xQurQ/robinhoo.jpg" 
              alt="Surprise!" 
              className="w-full h-96 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">fim da linha</h3>
              <p className="text-gray-600 mb-4">ja era, voce caiu na pegadinha do robinho 💀</p>
              <button 
                onClick={() => {
                  setShowTroll(false);
                  setShowCheckout(false);
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;