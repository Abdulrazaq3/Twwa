import React, { useState } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import Opportunities from './components/pages/Opportunities';
import Profile from './components/pages/Profile';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import { VolunteerProvider } from './contexts/VolunteerContext';
import AiAssistantPage from './components/pages/AiAssistantPage';
import SplashScreen from './components/SplashScreen';
import PageTitleUpdater from './components/PageTitleUpdater';
import BackToTopButton from './components/BackToTopButton';
import CompleteProfile from './components/pages/CompleteProfile';
import Leaderboard from './components/pages/Leaderboard';

const AppLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
      <BackToTopButton />
    </div>
  );
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleFinishLoading = () => {
    setLoading(false);
  };
  
  return (
    <HashRouter>
      <PageTitleUpdater />
      <VolunteerProvider>
        {loading && <SplashScreen onFinished={handleFinishLoading} />}
        
        <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Routes>
        </div>

      </VolunteerProvider>
    </HashRouter>
  );
};

export default App;