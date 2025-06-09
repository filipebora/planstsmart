import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MyPlants from './pages/MyPlants';
import PlantDetail from './pages/PlantDetail';
import WateringSchedule from './pages/WateringSchedule';
import HealthAlerts from './pages/HealthAlerts';
import PlantDatabase from './pages/PlantDatabase';
import Babuino from './pages/Babuino';
import Premium from './pages/Premium';
import Credits from './pages/Credits';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PlanTalks from './pages/PlanTalks';
import PlanTalksFeed from './pages/PlanTalksFeed';
import PlantWishlist from './pages/PlantWishlist';
import EmergencyGuide from './pages/EmergencyGuide';
import PlantQuiz from './pages/PlantQuiz';
import Achievements from './pages/Achievements';
import { PlantProvider } from './contexts/PlantContext';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Wrapper component for PlantDetail to handle URL parameters
const PlantDetailWrapper = () => {
  const { id } = useParams();
  return id ? <PlantDetail plantId={id} onBack={() => window.history.back()} /> : <Navigate to="/plantas" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <Login onLogin={() => setIsAuthenticated(true)} showSignUp={true} />
      </>
    );
  }

  return (
    <Router>
      <PlantProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plantas" element={<MyPlants />} />
                <Route path="/plantas/:id" element={<PlantDetailWrapper />} />
                <Route path="/agenda" element={<WateringSchedule />} />
                <Route path="/alertas" element={<HealthAlerts />} />
                <Route path="/banco" element={<PlantDatabase />} />
                <Route path="/babuino" element={<Babuino />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/creditos" element={<Credits />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/plantalks" element={<PlanTalks />} />
                <Route path="/plantalks/feed" element={<PlanTalksFeed />} />
                <Route path="/wishlist" element={<PlantWishlist />} />
                <Route path="/emergencia" element={<EmergencyGuide />} />
                <Route path="/quiz" element={<PlantQuiz />} />
                <Route path="/conquistas" element={<Achievements />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </PlantProvider>
    </Router>
  );
}

export default App;